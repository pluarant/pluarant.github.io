---
title: Mesibo HTTP Library for Android, iOS, Linux, Mac
heading: Mesibo HTTP Library 
description: Mesibo HTTP is a light but fast and powerful http client library compliant with RFC 7230-7235, 1738, 2046. It is an extension of mesibo real-time Client APIs.
keywords: http library for android, ios, http protocol, http requests, http client library, mesibo http benefits
---
### Introduction

Mesibo HTTP is a light but fast and powerful http client library compliant with RFC 7230-7235, 1738, 2046. It is an extension of mesibo real-time Client APIs.

Mesibo HTTP not only makes networking easier, but also makes it faster, and cross-platform (Android, iOS). It lets you control almost all aspects of the HTTP protocol giving you finer control over HTTP requests.

While there are some good HTTP libraries such as Volley for Android and AFNetworking for iOS, mesibo has the distinct advantage of being cross platform by offering the same APIs across platforms thus eliminating the need to use different libraries for different platforms. mesibo HTTP also performed faster in a benchmark test and has the smaller memory footprint.

Advantages of using mesibo HTTP over other APIs:
- Unified programming interface across Android and iOS, eliminating the need for using two different libraries for Android and iOS.
- Very fast - during the lab testing, it was found to perform 50% faster than Volley/URLConnection (Android) and AFNetworking (iOS) for uploading and downloading large files.
- Ultra small memory footprint - default is 64KB and you can change in configuration (bufferSize).
- Configurable to the core - almost all aspects of HTTP protocols, security, proxy, cache, content encoding, retries, resume, keep-alive and so on.
- HTTP Request queuing and throttling
- HTTP persistent connections and request pipelining
- Efficient and configurable cache
- Resuming broken downloads and uploads
- POST, upload, download - all can be combined in a single request, if required Seamless and automatic support of multipart requests
- HTTP Basic Digest authentication
- Proxy authentication
- Precise status and progress update of every state of HTTP protocol
- Settable Timeouts for every state of the protocol (connection, headers, body)
- Cancelable requests
- Synchronous and Asynchronous mode of operation
- Special Content-Size header processing in case of chunked transfer
- [iOS] PHAsset capable.
- No additional module dependencies


Creating a network request using mesibo HTTP is as simple as constructing a mesibo Http object, assigning a listener and executing it (or queueing it). When you invoke execute(), mesibo initiates http connection and updates you in real-time about the progress by invoking your listener. You could also use executeAndWait() instead of execute() to wait till the execution is completed or error, if any. Following are two sample codes:

### Installation
Mesibo HTTP library is bundled with the Mesibo real-time API library. Hence, no separate installation is required. Refer to [Installation instructions]({{ '/documentation/install/' | relative_url }}) for detail.

#### Android Sample code for downloading a file with resume:

{% highlight java %}
Mesibo.Http http = new Mesibo.Http();

http.url = “https://someserver.mesibo.com/file/test.jpg”;
http.downloadFile = “/sdcard/MyApp/Files/test.jpg”;
http.resume = true;
http.maxRetries = 10;
http.other = myObject; // callback data

http.onMainThread = true; // invoke listener in main thread
http.listener = new Mesibo.HttpListener() {
@Override
	public boolean Mesibo_onHttpProgress(Mesibo.Http http, int state, int percent) {
		if(100 == percent && Mesibo.Http.STATE_DOWNLOAD == state) {
			// download complete
		}

		Return true; // return false to cancel
	}
};

if(http.execute()) {

}
{% endhighlight %}

#### iOS Objective-C Sample code for sending a simple POST request

{% highlight objective_c %}
MesiboHttp *http = [MesiboHttp new];
http.url = @“https://api.mesibo.com/api.php”;

//POST Data
http.postBundle = [[NSMutableDictionary alloc] init];
[http.postBundle setValue:@"logout" forKey:@"op"];
[http.postBundle setValue:mToken forKey:@"token"];

http.listener = ^BOOL(MesiboHttp *http, int state, int progress) {

	if(100 == progress && state == Mesibo_HTTPSTATE_DOWNLOAD) {
		NSString *response = [http getDataString];
		//parse response
	}
	return YES;
}

//Synchronous request, use execute instead for async request
if([http executeAndWait]) {
	return [http getDataString];
}
{% endhighlight %}

### Queuing &amp; limiting simultaneous connections

In the above code examples, all the HTTP requests execute immediately and parallelly; however, often it’s desirable to queue the requests to limit the resource utilization and the number of simultaneous connections. This is where queue helps.

Queue lets you control the number of HTTP requests to execute in parallel. You can add your request into the front or the back of a queue, and queue processes one by one from the front. If the number of simultaneous connection limit is not reached, then the queue executes request immediately, else it will wait for the next available slot.

You can have a global request queue or multiple queues per destination as required by your application.

Sending an http request in a queue is almost the same as above examples; however, instead of executing it, you use queue() function as shown below

{% highlight java %}
Int maxSimultaneousRequests = 4;
Int maxPendingRequests = 8;  // 0 for unlimited

// Create a queue
Mesibo.HttpQueue mHttpQueue = new HttpQueue(maxSimultaneousRequests,
		maxPendingRequests);

// initialize http object
Mesibo.Http http = new Mesibo.Http();
http.url = “https://someserver.mesibo.com/file/test.jpg”;

...

// instead of executing it, queue the request
mHttpQueue.queue(http);

{% endhighlight %}
### Caching

Mesibo gives you precise control over the cache. By default, the cache is enabled and the responses are cached adhering to standard and server response. mesibo will not cache if the server has restricted response from being cached. It also re-validates the cached objects as recommended by the server in its cache control response headers.

You can, however, override this default behavior per request using various caching options in HTTP object; for example, forced caching or forced reading from the cache without revalidating. For more details, refer to HTTP object documentation below.

By default, the cache is enabled. Mesibo uses app cache folder to store the cache objects. The size of the cache is limited by the system-recommended cache size. You can, however, override the cache folder and the max size by invoking static method - ‘setCacheFolder’. Note, this is a global change and all the subsequent invocations will use this new folder.

#### **[Android]**

{% highlight java %}
Mesibo.http.setCacheFolder(path, maxSizeInBytes);
{% endhighlight %}


#### **[iOS]**

{% highlight objective_c %}
[MesiboHttp setCacheFolder:path size:maxSizeInBytes];
{% endhighlight %}


### Persistent Connections (Keep-Alive) and Requests Pipelining

By default, Mesibo enables intelligent Keep-Alive and request pipelining for effective resource utilization and to get faster responses. You can, however, turn off this behaviour per request by setting the ‘persistent’ field to false in the HTTP object.

### Asynchronous Callback Thread

By default, Mesibo invokes listener in the main thread and you don’t have to code extra. You can, however, override this behaviour in two ways by:

- disabling it by setting onMainThread field to false in the Http object.

OR

- [For Android] defining your own android.os.handler object and setting it to Http.handler field. Mesibo will then invoke listener using that handler. [For iOS] defining your own dispatch_queue and setting it to Http.handler field. Mesibo will then post listener to that dispatch queue.


## Mesibo HTTP Object

Following is the description of all the parameters of Mesibo Http object for both Android and iOS.

**Android:**

Mesibo.Http

**iOS:** 

[Mesibo Http]

> All the fields except url are **OPTIONAL** and can be left uninitialized.

### Basic Configuration Fields

|url|ServerURL, both http and https url are supported. You can also pass authentication information in url. For example, https://username:password@yourapiurl.com|
|proxy|Proxy URL. Similar to url field, you can also pass authentication information here.|
|post|Raw POST data|
|postBundle|POST key value string pairs.For Android, key value pairs can be passed in a Bundle().For iOS, NSDictionary is used to pass key value pairs.Key and Values will be URL encoded before sending to server. This field is ignored if ‘post’ field is specified. |
|contentType|Content-Type header to be sent if post or postBundle parameter is specified. Default is application/x-www-form-urlencoded. You typically don’t need to change this field unless you know what you are doing.|
|cookie|Send HTTP Cookie Header|
|downloadFile|Path where downloaded file will be saved.|
|downloadOffset|Offset from where to start download, default 0|
|downloadEnd|Offset where download to be stopped, default, end of the file|
|uploadFile|Path of the file to be uploaded|
|uploadPhAsset|[iOS only] PHAsset Object|
|uploadLocalIdentifier|[iOS only] PHAsset local identifier|
|uploadOffset|Offset from where to start upload, default 0|
|uploadEnd|Offset where upload to be stopped, default, end of the file|
|uploadFileField|POST field name for file being uploaded. Default file|
|uploadFileOffsetField|POST field name for upload offset. Your server can use this field to append partially uploaded file. Default file_offset|
|uploadFileName|File name to be sent to server. If none is specified, actual file name without the path will be sent. |
|uploadFileType|File Type to be sent|
|extraHeaders|Any custom headers you like to send|
|userAgent|User Agent, default mesibo/x.x|
|referrer|HTTP referer header|
|origin|HTTP origin header|
|encoding|HTTP content encoding header|
|cacheControl|HTTP Cache Control header|
|ims|Set If-Modified-SInce header, timestamp|

### Connection Control Fields

|bufferSize|Set buffer size for reading/writing files and the network connection. Default 64K, Increasing it may slightly increase the performance. |
|caCertificateFile|SSL Root CA certificate file path. SSL Host verification will be performed only if a valid CA certificate is specified.|
|connectionTimeout|Connection Timeout, in milliseconds|
|headerTimeout|Response Header Timeout, in milliseconds|
|bodyTimeout|Body packet timeout, in milliseconds.|
|headerOnly|Don’t download the response body (HEAD request). Useful to query the file info. Default, false.|
|resume|Download resume mode. If false, the downloaded file will be overwritten instead of appending. Default is true.|
|persistent|Keep Persistent (Keep-Alive) connection. Default is true.|
|sendCacheHeader|Send no cache header. Only useful if proxy is used.|
|concatData|Concatenate as much response data as possible (up to bufferSize) before invoking listener. Default is true if downloadFile is not specified.|

### Cache Control Fields

|readCache|Enable or disable reading from cache. Default, true|
|readCacheForced|Do not validate read cache. Default, false|
|updateCache|Enable or disable updating cache. Default, true|
|updateCacheForced|Cache response even if server restricted (no-store) from storing it. Default, false|

### Listener and App Context Fields

|listener|Listener to be called. mesibo invokes listener with three parameters<ol>- this object- State - state can be either STATE_UPLOAD (sending header, sending post data and/or uploading file ) or STATE_DOWNLOAD (receiving response data / download file data)- Progress, 0 to 100. In case of error, -1 will be sent and error field will be set.</ol>Return Value: listener MUST return true to continue or false to abort/cancel.Listener MUST always check the state before interpreting the progress. For example, when sending a POST request, the listener will be invoked twice with progress == 100: first time when the post data is sent and the second time when the response is received. In this case, received response is only valid when percent == 100 and the state is STATE_DOWNLOADFor Android, listener is an instance of mesibo.HttpListener().For iOS, it’s a block of type mesibo_HttpListner.|
|onMainThread|Invoke listener in the main thread. Set this to false if you don’t need to update UI. Default, true|
|handler|Optional, default null (android) or nil(iOS)[Android] android.os.handler object where listener will be posted[iOS]dispatch_queue where listener will be posted|
|other|User-defined object (for example, to store app state or context)|

### Response Fields

|result|Result, 0 for success, error otherwise|
|respCode|HTTP protocol response code|
|errorCode|Error Code|
|error|Error String|
|state|State, STATE_UPLOAD or STATE_DOWNLOAD|
|progress|Progress|
|contentLength|Content Length in bytes.Note: In some cases, the server does not send Content-Length header, especially for chunked transfer (dynamic data). In such cases, you can send a special header, Content-Size, and it will be reflected here if the Content-Length header is not present.|
|offset|Content Offset (for broken &amp; resumed downloads)|
|respEncoding|Response encoding|
|respCached|True if the response came from the cache.|
|ts|Execution timestamp|

### Methods

|execute|Start execution and return immediately|
|executeAndWait|Start execution and wait for it to be completed|
|cancel|Cancel execution|
|getData|Get response data as byte array.Data will be null (nil on iOS) if downloadFile is specified.|
|getDataString|Get response data as string.Data will be null (nil on iOS) if downloadFile is specified.|
|urlEncode|URL encode a string|
|setCacheFolder|[static method] applies to all subsequent requests  Path, cache pathSize, maximum cache size in bytes|


