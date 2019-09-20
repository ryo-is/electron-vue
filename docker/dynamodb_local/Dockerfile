FROM frolvlad/alpine-oraclejdk8:slim
EXPOSE 8000
WORKDIR /dynamodb

ENV DDB_LOCAL_VERSION=2018-04-11 \
  DDB_LOCAL_SHA256=4afae454157256e3525df91b5ae2c6b6683ce05f92284e79335b2ac8e2e53762

ARG BUILD_DATE
ARG VCS_REF

RUN apk update && \
  apk add ca-certificates wget && \
  update-ca-certificates && \
  apk add --no-cache openssl && \
  wget -q -O dynamodb_local.tar.gz https://s3-us-west-2.amazonaws.com/dynamodb-local/dynamodb_local_${DDB_LOCAL_VERSION}.tar.gz && \
  echo "${DDB_LOCAL_SHA256}  dynamodb_local.tar.gz" | sha256sum -c - && \
  tar xzf dynamodb_local.tar.gz && \
  rm dynamodb_local.tar.gz && \
  rm -rf /var/cache/apk/* && \
  rm -rf /tmp/* /var/tmp/* && \
  apk del openssl

RUN mkdir -p /dynamodb_data

VOLUME /dynamodb_data
ENTRYPOINT ["/usr/bin/java", "-Djava.library.path=./DynamoDBLocal_lib", "-jar", "DynamoDBLocal.jar", "-sharedDb"]
CMD ["-dbPath","/dynamodb_data"]
