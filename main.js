
sslLabs = {
	cache: {},
	tab_id: 0,
	last_domain: "",
	// Detect HTTP Urls
	https_pattern: /^https:\/\//,
	// Remove the Domain From URL it might be an HTTP url
	domain_pattern: /^http(s|):\/\//,
	api_url: "https://api.ssllabs.com/api/v2/analyze?host=",
	detail_url: "https://www.ssllabs.com/ssltest/analyze.html?&hideResults=on&d=",

	onChange: function(url, tabId){
		sslLabs.tab_id = tabId;
		grade = 'no';
		if(url.match(this.https_pattern)){
			domain = this.getDomainFromUrl(url);
			if(this.cache[domain]){
				grade = this.cache[domain];
			}
			$.getJSON(sslLabs.api_url + domain, function(data){
				grade = data.endpoints[0].grade;
				sslLabs.setIcon(grade);
			});
			return;
		}
		return this.setIcon(grade);
	},

	setIcon: function(grade){
		console.log("*** GRADE: " +grade);
		iconOptions = {};
		iconOptions.tabId = sslLabs.tab_id;
		iconOptions.path = 'icons/' + grade.toLowerCase() + '.png';

		chrome.pageAction.setIcon(iconOptions);
		chrome.pageAction.show(sslLabs.tab_id);
		return true;
	},

	/**
	 * Returns the domain from an url
	 * @param  {string} url the url to for domain extrantion
	 * @return {string}     the grade of the url or NO if no lookup coul be found
	 */
	getDomainFromUrl: function(url){
		domain = url.replace(this.domain_pattern,"").split("/")[0];
		return domain;
	},

	getApiUrl: function(domain){
		return ;
	}
};

chrome.pageAction.onClicked.addListener(function(tab){
	console.log("click");
	domain = sslLabs.getDomainFromUrl(tab.url);
	chrome.tabs.create({ url: sslLabs.detail_url + domain });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	// Be Nice to ssllabs and only query on page loading (not again on complete)
	if(changeInfo.status == "loading"){
		sslLabs.onChange(tab.url, tabId);
	}
});


