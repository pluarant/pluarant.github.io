function populate_class(classname, version) {
	var e = document.getElementsByClassName(classname);
	for(var i = 0; i < e.length; i++) {
		e[i].innerHTML = version;
	}
}

function populate_name(name, version) {
	var e = document.getElementsByTagName('code');
	for(var i = 0; i < e.length; i++) {
		e[i].innerHTML = e[i].innerHTML.replace(name, version);
	}
}

function populate_ioslink(id, version) {
	var e = document.getElementById(id);
	if(e) {
		e.innerHTML = e.innerHTML + '-framework-' + version + '.tgz';
		e.href = '../downloads/ios/' + e.innerHTML;
	}
}

var g_vcalled = 0;
function populate_versions() {
	if(g_vcalled)
		return;
	g_vcalled = 1;
	for (var key in maven_versions) {
		populate_name("version_" + key, maven_versions[key]);
	}
	
	for (var key in ios_versions) {
		populate_ioslink("ios_" + key, ios_versions[key]);
	}
}

function chain(f1, f2) {
    return typeof f1 !== 'function' ? f2 : function() {
        var r1 = f1.apply(this, arguments),
            r2 = f2.apply(this, arguments);
        return typeof r1 === 'undefined' ? r2 : (r1 && r2);
    };
}

function addOnloadListener(func) {
    if(window.addEventListener)
        window.addEventListener('load', func, false);
    else if(window.attachEvent)
        window.attachEvent('onload', func);
    else window.onload = chain(window.onload, func);
}

addOnloadListener(populate_versions);
$(document).ready(function() {
		populate_versions();
		    });
