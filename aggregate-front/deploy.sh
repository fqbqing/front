#!/bin/sh

WORK_DIR=`dirname $0`
WORK_DIR=`cd $WORK_DIR; pwd`
echo "Work dir: $WORK_DIR"
die () {
        echo $1
        exit 1
}
cd $WORK_DIR

DEPLOY_TAR=output.tar.gz
echo 'Deploying... '
TARGET_PATH=/home/work/aggregate-back
[ -d $TARGET_PATH ] || mkdir -p $TARGET_PATH
cp $DEPLOY_TAR $TARGET_PATH
cd $TARGET_PATH && tar zxf $DEPLOY_TAR && rm $DEPLOY_TAR

echo 'Deployed'