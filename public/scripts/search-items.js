const handleEdit = async (id) => {
    await fetch('/update-item?',JSON.stringify({id: id}), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: id})
    })
};



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
        <a href="/items/delete/${item._id}" class="btn btn-primary">Delete</a>
        <a href="/items/update/${item._id}" class="btn btn-primary">View / Update</a>

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
