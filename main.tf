terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }


  backend "s3" {
    bucket = "carlos-terraform-curso-state-00147854" # Mismo bucket
    key    = "portafolio-web/terraform.tfstate"      # <--- AQUÍ ESTÁ EL CAMBIO
    region = "us-east-1"

    dynamodb_table = "carlos-curso-terraform-locks" # Misma tabla (funciona perfecto)
    encrypt        = true
  }
}



provider "aws" {
  region = "us-east-1" # N. Virginia es estándar para esto

  default_tags {
    tags = {
      Environment = "Produccion"
      Project     = "Portafolio-Web"
      ManagedBy   = "Terraform"
      Owner       = "Carlos"
    }
  }
}



variable "bucket_name" {
  default = "portafolio-data-engineer-carlos-v2" # Asegúrate que coincida o cámbialo si quieres uno nuevo
}

# --- 1. S3 BUCKET (ALMACENAMIENTO) ---

resource "aws_s3_bucket" "portfolio" {
  bucket = var.bucket_name
}

# Subida de archivos (Igual que antes)
resource "aws_s3_object" "html" {
  bucket       = aws_s3_bucket.portfolio.id
  key          = "index.html"
  source       = "index.html"
  content_type = "text/html"
  etag         = filemd5("index.html")
}

resource "aws_s3_object" "css" {
  bucket       = aws_s3_bucket.portfolio.id
  key          = "style.css"
  source       = "style.css"
  content_type = "text/css"
  etag         = filemd5("style.css")
}

resource "aws_s3_object" "js" {
  bucket       = aws_s3_bucket.portfolio.id
  key          = "script.js"
  source       = "script.js"
  content_type = "application/javascript"
  etag         = filemd5("script.js")
}

# --- 2. SEGURIDAD S3 (BLOQUEO DE ACCESO PÚBLICO) ---
# A diferencia de antes, ahora BLOQUEAMOS todo acceso directo.
# Solo CloudFront entrará por la "puerta trasera".
resource "aws_s3_bucket_public_access_block" "portfolio" {
  bucket = aws_s3_bucket.portfolio.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# --- 3. CLOUDFRONT (CDN) ---

# Control de Acceso al Origen (La "llave" que usa CloudFront para entrar a S3)
resource "aws_cloudfront_origin_access_control" "default" {
  name                              = "seguridad-portafolio"
  description                       = "Politica para acceso S3 portafolio"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name              = aws_s3_bucket.portfolio.bucket_regional_domain_name
    origin_id                = "S3-${aws_s3_bucket.portfolio.id}"
    origin_access_control_id = aws_cloudfront_origin_access_control.default.id
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.portfolio.id}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https" # Fuerza HTTPS
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true # Usa certificado HTTPS gratis de CloudFront
  }
}

# --- 4. POLÍTICA DE S3 PARA PERMITIR A CLOUDFRONT ---
# Esto autoriza explícitamente a TU distribución de CloudFront a leer el bucket

resource "aws_s3_bucket_policy" "allow_cloudfront" {
  bucket = aws_s3_bucket.portfolio.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowCloudFrontServicePrincipal"
        Effect = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.portfolio.arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.s3_distribution.arn
          }
        }
      }
    ]
  })
}

# --- OUTPUTS ---
output "cloudfront_url" {
  description = "URL segura de tu portafolio"
  value       = "https://${aws_cloudfront_distribution.s3_distribution.domain_name}"
}
