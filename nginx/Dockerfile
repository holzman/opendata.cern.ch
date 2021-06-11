# -*- coding: utf-8 -*-
#
# This file is part of CERN Open Data Portal.
# Copyright (C) 2016 CERN.
#
# CERN Open Data Portal is free software; you can redistribute it
# and/or modify it under the terms of the GNU General Public License as
# published by the Free Software Foundation; either version 2 of the
# License, or (at your option) any later version.
#
# CERN Open Data Portal is distributed in the hope that it will be
# useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
# General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with CERN Open Data Portal; if not, write to the
# Free Software Foundation, Inc., 59 Temple Place, Suite 330, Boston,
# MA 02111-1307, USA.
#
# In applying this license, CERN does not
# waive the privileges and immunities granted to it by virtue of its status
# as an Intergovernmental Organization or submit itself to any jurisdiction.

ARG NGINX_VERSION=1.19.6
ARG BITNAMI_NGINX_REVISION=r0
ARG BITNAMI_NGINX_TAG=${NGINX_VERSION}-debian-10-${BITNAMI_NGINX_REVISION}

FROM bitnami/nginx:${BITNAMI_NGINX_TAG} AS builder
USER root
# Redeclare NGINX_VERSION so it can be used as a parameter inside this build stage
ARG NGINX_VERSION
# Install required packages and build dependencies
RUN install_packages dirmngr gpg gpg-agent curl build-essential libpcre3-dev zlib1g-dev libperl-dev
# Add trusted NGINX PGP key for tarball integrity verification
RUN gpg --keyserver pgp.mit.edu --recv-key 520A9993A1C052F8
# Download NGINX, verify integrity and extract
RUN cd /tmp && \
    curl -O http://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz && \
    curl -O http://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz.asc && \
    gpg --verify nginx-${NGINX_VERSION}.tar.gz.asc nginx-${NGINX_VERSION}.tar.gz && \
    tar xzf nginx-${NGINX_VERSION}.tar.gz
# Compile NGINX with desired module
RUN cd /tmp/nginx-${NGINX_VERSION} && \
    rm -rf /opt/bitnami/nginx && \
    ./configure --prefix=/opt/bitnami/nginx --with-compat --with-http_perl_module=dynamic && \
    make && \
    make install

FROM bitnami/nginx:${BITNAMI_NGINX_TAG}
USER root
# Install ngx_http_perl_module system package dependencies
RUN install_packages libperl-dev
# Install ngx_http_perl_module files
COPY --from=builder /usr/local/lib/x86_64-linux-gnu/perl /usr/local/lib/x86_64-linux-gnu/perl
COPY --from=builder /opt/bitnami/nginx/modules/ngx_http_perl_module.so /opt/bitnami/nginx/modules/ngx_http_perl_module.so
# Enable module
RUN echo "load_module modules/ngx_http_perl_module.so;" | cat - /opt/bitnami/nginx/conf/nginx.conf > /tmp/nginx.conf && \
    cp /tmp/nginx.conf /opt/bitnami/nginx/conf/nginx.conf
# Set the container to be run as a non-root user by default
USER 1001
