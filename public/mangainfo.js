async function getMangaInformation(id) {
    try{  
        const response = await fetch(` https://api.mangadex.org/manga/${id}?includes%5B%5D=`); 
        if (response.ok) {
          const data = await response.json();
          mangainfo = data.data; // Handle manga data here
          populateInfo()
       } else {
        throw new Error('Network response was not ok.');
      }}catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
}



async function getMangaChapterList(id) {
    try{  
       
        const response = await fetch(` https://api.mangadex.org/chapter?limit=100&manga=${id}&translatedLanguage%5B%5D=en`); 
        if (response.ok) {
          const data = await response.json();

         

         const arrayOfPairs = Object.entries(data.data);
         arrayOfPairs.sort(([keyA, valueA], [keyB, valueB]) => {
          const chapterA = Number(valueA.attributes.chapter);
          const chapterB = Number(valueB.attributes.chapter);
          return chapterA - chapterB;
        });
        

        const sortedObject = arrayOfPairs.reduce((acc, [key, value], index) => {
          acc[index + 1] = value;
          return acc;
        }, {});
        
        const numberOfChapters= Object.keys(sortedObject).length;

    


         for(i=0;i<numberOfChapters;i++){
          if (sortedObject[i + 1] && sortedObject[i + 1].attributes) {
            populateChapters(sortedObject[i + 1].attributes.chapter,sortedObject[i + 1].id);
        }
        
        }
      
       } else {
        throw new Error('Network response was not ok.');
      }}catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
}


var mangainfo
function getVariablesFromUrl() {
        const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
  
      const variables = {};
  
      for (const [key, value] of urlParams.entries()) {
          variables[key] = value;
      }
  
      return variables;
    }


const urlVariables = getVariablesFromUrl();

window.onload = function() {
  getMangaInformation(urlVariables.id);
  getMangaChapterList(urlVariables.id)
  
};


function populateInfo(){

const artCover = document.getElementById('MIArtCover')
artCover.src = `https://uploads.mangadex.org/covers/${urlVariables.id}/${urlVariables.filename}`
document.getElementById('MITitle').textContent  = urlVariables.title
document.getElementById('MIdesc').textContent = mangainfo.attributes.description.en
}

function populateChapters(chaptercount,id){
    const element = document.getElementById('MIchapters')
    const button = document.createElement("button");

    const anc = document.createElement("a");
    const chapter_id = id;
    anc.href = `mangachapter?id=${chapter_id}`
    anc.target = "_blank"

    button.classList.add("buttonChapter");
    anc.classList.add("ancChapter");
    anc.classList.add("col-1");
    button.textContent = chaptercount
    
    button.id = id;
    anc.appendChild(button);
    element.appendChild(anc);

   
    
}