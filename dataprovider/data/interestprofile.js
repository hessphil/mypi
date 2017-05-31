class InterestProfile
{
		constructor(){
		this.keywordArray=[];
		this.interpretsArray=[];
		this.newsProviderArray=[];
		}
		
		
		addKeyWord(keyword)
		{
			this.keywordArray.push(keyword);
		}
		addInterpret(interpret)
		{
			this.interpretsArray.push(interpret);
		}
			addnewsProvider(newsProvider)
		{
			this.newsProviderArray.push(newsProvider);
		}
}

module.exports = InterestProfile;