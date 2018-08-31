
Deploy:
	docker build -t zywxb .
	
	# push to avatest
	docker tag zywxb reg.qiniu.com/avatest/zywxb:v1.4
	docker push reg.qiniu.com/avatest/zywxb:v1.4
