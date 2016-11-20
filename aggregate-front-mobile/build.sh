#!/bin/sh

export NODE_PATH=/usr/lib/node_modules:/usr/local/lib/node_modules

BUILD_NAME="./output"

if [ -d $BUILD_NAME ]; then
    rm -rf $BUILD_NAME
fi

deployed=`cat /home/work/product/babamaiche-aggregate-front-mobile/deployed`

if [ -z $deployed ]; then
    deployed=1
fi

# 替换新的版本号
sed "s/\[oss_version\]/$deployed/g" edp-build-config.js  > edp-build-config.js.new
mv edp-build-config.js.new edp-build-config.js

#edp build -f

if [ x$1 == "xtest" ]
then
    echo "Start Build For TEST"
    edp build -f -s test
else
    echo "Start Build For PRODUCT"
    NODE_ENV=prod edp build -f -s release
fi

cd $BUILD_NAME
tar zcvf output.tar.gz `ls .`

echo "build Completed"
