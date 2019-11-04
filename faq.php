<?
define("WEBSITE_PATH", "/Users/yusuf/website/new/mesibo");

function fetch($url, &$respcode) {
	$respcode = 200;
	$ch = curl_init();
	curl_setopt($ch,CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);  
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
	curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch,CURLOPT_CONNECTTIMEOUT, 10);
	curl_setopt($ch,CURLOPT_TIMEOUT, 20);
	$response = curl_exec($ch);
	if (!$response) {
		$info = curl_getinfo($ch);
		$respcode = $info['http_code'];
	}
	curl_close ($ch);
	return $response;
}

function yaml_output($t) {
	$id = $t['id'];
	$tag = trim($t['tag']);
	$y = json_decode(fetch("https://internal.mesibo.com/faq/api.php?op=yaml&tid=$id", $respcode), true);
	//print $y['yaml'];
	file_put_contents(WEBSITE_PATH."/_data/faq/$tag.yaml", $y['yaml']);
}

function md_output($t) {
	$id = $t['id'];
	$tag = trim($t['tag']);
	$name = trim($t['name']);
	$title = trim($t['title']);
	$keywords = trim($t['keywords']);
	$url = trim($t['url']);

	if($name == '') 
		$name = ucfirst($tag);
	
	if($title == '') 
		$title = "Frequently Asked Questions - $name";

	if($keywords == '')
		$keywords = "mesibo, faq, chat, voice, video";
	
	if($url == '')
		$url = $tag;

	$md = <<<XML
---
section: $name
title: $title
keywords: $keywords
description: $title
---
{% assign faq_data = site.data.faq.$tag %}

{% include_relative template/faq-template.md  %}

XML;
	//print $md;
	file_put_contents(WEBSITE_PATH."/documentation/faq/$url.md", $md);
}

$ts_file = "faq.ts";
$ts = 0;
if(file_exists($ts_file))
	$ts = intval(file_get_contents($ts_file));

$resp = json_decode(fetch("https://internal.mesibo.com/faq/api.php?op=tags&ts=$ts", $respcode), true);
$tags = $resp['tags'];
print_r($tags);
$menu = '';
foreach($tags as $t) {
	$id = $t['id'];
	$tag = $t['tag'];
	if(intval($t['ts']) > intval($ts)) {
		$ts = intval($t['ts']);
	}
	print "fetching FAQ - $tag\n";
	yaml_output($t);
	md_output($t);
	$name = trim($t['name']);
	$url = trim($t['url']);
	if($name == '') 
		$name = ucfirst($tag);
	if($url == '')
		$url = $tag;
	$menu .= "  - path: /documentation/$url/\n    title: $name\n";
	//print "$id $tag\n";
	//break;
}

file_put_contents($ts_file, $ts);
file_put_contents(WEBSITE_PATH."/_data/faq_menu.yaml", $menu);
