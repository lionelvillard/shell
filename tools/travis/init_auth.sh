#!/usr/bin/env bash

SCRIPTDIR=$(cd $(dirname "$0") && pwd)
ROOTDIR="$SCRIPTDIR/../.."

if [ -z "$WHISKDIR" ]; then
    WHISKDIR="$ROOTDIR/../openwhisk"
fi

if [ ! -d "$WHISKDIR" ]; then
    echo "Please set $WHISKDIR"
    exit 1
fi

export WHISKDIR
echo "Found WHISKDIR=$WHISKDIR"

DIR=$ROOTDIR/.openwhisk-shell/keys
mkdir -p $DIR

echo "Made key dir=$DIR"

cd $SCRIPTDIR

./wskadmin user delete user01  | grep -v "Failed to delete subject"
./wskadmin user delete user02  | grep -v "Failed to delete subject"
./wskadmin user delete user03  | grep -v "Failed to delete subject"
./wskadmin user delete user04  | grep -v "Failed to delete subject"
./wskadmin user delete user04b | grep -v "Failed to delete subject"
./wskadmin user delete user05  | grep -v "Failed to delete subject"
./wskadmin user delete user06  | grep -v "Failed to delete subject"
./wskadmin user delete user07  | grep -v "Failed to delete subject"
./wskadmin user delete user08  | grep -v "Failed to delete subject"

./wskadmin user create user01 -ns ns01 > $DIR/01    2> /dev/null
./wskadmin user create user02 -ns ns02 > $DIR/02    2> /dev/null
./wskadmin user create user03 -ns ns03 > $DIR/03    2> /dev/null
./wskadmin user create user04 -ns ns04 > $DIR/04    2> /dev/null
./wskadmin user create user04b -ns ns04b > $DIR/04b 2> /dev/null
./wskadmin user create user05 -ns ns05 > $DIR/05    2> /dev/null
./wskadmin user create user06 -ns ns06 > $DIR/06    2> /dev/null
./wskadmin user create user07 -ns ns07 > $DIR/07    2> /dev/null
./wskadmin user create user08 -ns ns08 > $DIR/08    2> /dev/null
