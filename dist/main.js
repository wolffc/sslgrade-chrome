/* TESTING domains
Fails to resolve on ssllabs - will throw error https://rentry.org/
https://github.com/ throws the change event thrice

*/
function callback() {
	if (chrome.runtime.lastError) {
		console.log('Looks like a tab died while we were processing it:', chrome.runtime.lastError.message);
	} else {
		// Tab exists
	}
}
let sslLabs = {
	cache: {},
	tab_id: 0,
	last_domain: "",
	// Detect HTTP Urls
	https_pattern: /^https:\/\//,
	// Remove the Domain From URL it might be an HTTP url
	domain_pattern: /^http(s|):\/\//,
	api_url: "https://api.ssllabs.com/api/v3/analyze?host=",
	detail_url: "https://www.ssllabs.com/ssltest/analyze.html?&hideResults=on&d=",

	onChange: function(url, tabId){
		sslLabs.tab_id = tabId;
		let grade = 'no';
		if(url.match(this.https_pattern)){
			let domain = this.getDomainFromUrl(url);
			if(this.cache[domain]){
				grade = this.cache[domain];
			}
			fetch(sslLabs.api_url + domain)
				.then(response => response.json())
				.then(data => {
					console.log(data)
					const grades = ['A+', 'A', 'A-', 'B', 'C', 'D', 'E', 'F', 'M', 'T'];
					let worstGrade = -1;
					let allReady = true;
					let errorGrade = false;

					if (data && data.status === 'ERROR') {
						errorGrade = true;
					} else if (data && data.status === 'IN_PROGRESS' || data.status === 'DNS') {
						allReady = false;
					} else if (data && data.status === 'READY' && data.endpoints) {
						for (const endpoint of data.endpoints) {
							const gradeIndex = grades.indexOf(endpoint.grade);
							if (gradeIndex > worstGrade) {
								worstGrade = gradeIndex;
							}
						}
					}

				if (errorGrade) {
					sslLabs.setIcon('error');
				} else if (!allReady) {
					sslLabs.setIcon('waiting');
				} else if (allReady && worstGrade > -1) {
					sslLabs.setIcon(grades[worstGrade]);
				}
				})
				.catch(error => {
					console.error('Error fetching JSON data:', error);
				});
			return;
		}
		return this.setIcon(grade);
	},

	setIcon: function(grade){
		console.log("*** GRADE: " + grade);
		let iconOptions = {};
		iconOptions.tabId = sslLabs.tab_id;
		iconOptions.path = '../icons/' + grade.toLowerCase() + '.png';

		chrome.action.setIcon(iconOptions, callback);
		return true;
	},

	/**
	 * Returns the domain from an url
	 * @param  {string} url the url to for domain extrantion
	 * @return {string}     the grade of the url or NO if no lookup could be found
	 */
	getDomainFromUrl: function(url){
		let domain = url.replace(this.domain_pattern,"").split("/")[0];
		return domain;
	},

	getApiUrl: function(domain){
		return ;
	}
};

chrome.action.onClicked.addListener(function(tab){
	console.log("click");
	let domain = sslLabs.getDomainFromUrl(tab.url);
	chrome.tabs.create({ url: sslLabs.detail_url + domain });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	// Be Nice to ssllabs and only query on page loading (not again on complete)
	if(changeInfo.status == "loading"){
		sslLabs.onChange(tab.url, tabId);
	}
});
