#!/bin/sh

BUILD_NAME="./output"

if [ -d $BUILD_NAME ]; then
    rm -rf $BUILD_NAME
fi

if [ x$1 == "xtest" ]
then
    echo "Start Build For TEST"
    fis3 release test -c -d $BUILD_NAME
else
    echo "Start Build For PRODUCT"
    fis3 release prod -c -d $BUILD_NAME
fi

cd $BUILD_NAME

tar zcvf output.tar.gz static tpl smarty

echo "build Completed"
