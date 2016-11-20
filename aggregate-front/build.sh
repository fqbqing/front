#!/bin/sh

BUILD_NAME="./output"
pwd=`pwd`

# 基于第一个参数，分别编译测试环境和生产环境
if [ x$1 == "xtest" ]
then
    echo "Start Build For TEST"

    fis3 release test -d ./output
else
    echo "Start Build For PRODUCT"

    NODE_ENV=prod fis3 release prod -d ./output
fi

cd $BUILD_NAME

# 将deploy.sh拷贝到output目录
cp $pwd/deploy.sh .

# 将编译结果打包到压缩文件中
tar zcvf output.tar.gz `ls .`

echo "build Completed"
