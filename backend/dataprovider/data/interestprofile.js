class InterestProfile
{
		constructor(){
		this.keywordArray=[];
		this.interpretsArray=[];
		this.newsProviderArray=[];
		this.musicGenreArray=[];
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
		addmusicGenre(musicGenre)
		{
			this.musicGenreArray.push(musicGenre);
		}
		
}

module.exports = InterestProfile;