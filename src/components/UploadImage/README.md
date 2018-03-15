## 上传图片组件

## 背景说明
    
    系统多处需要上传图片，为避免逻辑多处书写，抽出公共组件，上传的逻辑封装在组件内部，对外透明

## 参数说明

    
#### 接收的props

    limit：可允许上传的图片数量，目前基本上都是1，有数量要求的必须显示传入，否则不限制
    fileList: 默认选中的图片列表，结构如: [{url: 'xxx.png'}], 数组的每个元素是图片对象，必须提供url参数表示图片的绝对路径进行展示
    
#### 监听的事件
    
    onSuccess: 上传成功的回调函数，接收一个地址参数。地址是一个字符串数组，返回对应上传的文件的地址列表
    
## 举例说明

    参照/views/course/add.vue

```
    <upload-image
        :limit="1"
        :fileList="[{url: 'http://abc.com/222.png'}]"
        @onSuccess="onUploadCover"
    ></upload-image>
    
    onUploadCover(urls) {
        //urls里面就是所有的图片地址了
    }
```