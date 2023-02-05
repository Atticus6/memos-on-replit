if [[ -f ./memos && -s ./memos ]];then
	echo '文件存在,需要重制请删除home目录下的文件'
else
	echo "正在初始话..."
    go build -o memos ./bin/server/main.go
fi


./memos --mode prod --port 5230