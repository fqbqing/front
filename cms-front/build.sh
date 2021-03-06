#!/bin/sh

BUILD_NAME="./output"

deployed=`cat /home/work/product/babamaiche-cms-front/deployed`

if [ -z $deployed ]; then
    deployed=1
fi

if [ -d $BUILD_NAME ]; then
    rm -rf $BUILD_NAME
fi

#替换新的版本号
sed "s/\[oss_version\]/$deployed/g" edp-build-config.js  > edp-build-config.js.new
mv edp-build-config.js.new edp-build-config.js

if [ x$1 == "xtest" ]
then
    echo "Start Build For TEST"
    edp build -f -s test || exit 1
else
    echo "Start Build For PRODUCT"
    NODE_ENV=prod edp build -f -s release || exit 1
fi

cd $BUILD_NAME

tar zcvf output.tar.gz dep asset tpl esl.js favicon.ico

echo "build Completed"
