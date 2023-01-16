const searchView = (item) => `

<div class="col-12">
    <div class="card">
        <h5 class="card-header"> ${item.make} ${item.model} <strong>(search match: ${item.score})</strong></h5>
        <div class="card-body">
            <p class="card-text">${item.description}</p>
            <ul class="list-group">
                <li class="list-group-item">Asset number: ${item.asset}</li>
                <li class="list-group-item">Serial number: ${item.serial}</li>
                <li class="list-group-item">Location: ${item.location}</li>  
                <li class="list-group-item">Building: ${item.builindg}</li> 
                <li class="list-group-item">Status: ${item.status}</li> 
            </ul>
        </div>
    </div>      
`;



const handleClick = async () => {
    const searchVal = document.querySelector("#searchInput").value;
    try {
        const itemDomRef = document.querySelector("#searchItems");
        const ref = await fetch(`../api/search-items/?search=${searchVal}`);
        const searchResults = await ref.json();
        let itemHtml = [];
        searchResults.forEach(item => {
            itemHtml.push(searchView(item));
        });
        itemDomRef.innerHTML = itemHtml.join("");
    } catch (e) {
        console.log(e);
        console.log('Could not search api');
    }
}
