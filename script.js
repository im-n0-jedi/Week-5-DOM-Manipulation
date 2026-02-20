// 1. Toggle to show the Filter form and hide the Add New form
function showFilter() {
    document.getElementById('filterContent').style.display = 'block';
    document.getElementById('newContent').style.display = 'none';
}

// 2. Toggle to show the Add New form and hide the Filter form
function showAddNew() {
    // We use 'flex' instead of 'block' here because the CSS relies on flex-direction: column
    document.getElementById('newContent').style.display = 'flex';
    document.getElementById('filterContent').style.display = 'none';
}

// 3. Filter articles based on checkbox status
function filterArticles() {
    const showOpinion = document.getElementById('opinionCheckbox').checked;
    const showRecipe = document.getElementById('recipeCheckbox').checked;
    const showUpdate = document.getElementById('updateCheckbox').checked;

    const opinions = document.querySelectorAll('article.opinion');
    const recipes = document.querySelectorAll('article.recipe');
    const updates = document.querySelectorAll('article.update');

    // Show or hide elements based on whether their corresponding box is checked
    opinions.forEach(article => article.style.display = showOpinion ? '' : 'none');
    recipes.forEach(article => article.style.display = showRecipe ? '' : 'none');
    updates.forEach(article => article.style.display = showUpdate ? '' : 'none');
}

// 4. Add a new article to the DOM
function addNewArticle() {
    // Grab the values from the form inputs
    const title = document.getElementById('inputHeader').value;
    const text = document.getElementById('inputArticle').value;
    
    // Determine the article type and class based on the selected radio button
    let typeClass = '';
    let markerText = '';
    
    if (document.getElementById('opinionRadio').checked) {
        typeClass = 'opinion';
        markerText = 'Opinion';
    } else if (document.getElementById('recipeRadio').checked) {
        typeClass = 'recipe';
        markerText = 'Recipe';
    } else if (document.getElementById('lifeRadio').checked) {
        typeClass = 'update';
        markerText = 'Update'; 
    } else {
        alert("Please select an article type.");
        return;
    }

    if (!title || !text) {
        alert("Please provide both a title and text for the article.");
        return;
    }

    // Create the new article element
    const newArticle = document.createElement('article');
    newArticle.className = typeClass;

    // Construct the inner HTML matching the existing format
    newArticle.innerHTML = `
        <span class="marker">${markerText}</span>
        <h2>${title}</h2>
        <p>${text}</p>
        <p><a href="moreDetails.html">Read more...</a></p>
    `;

    // Append it to the article list
    document.getElementById('articleList').appendChild(newArticle);

    // Call filterArticles so the new article adheres to the current filter checkboxes
    filterArticles();

    // Optional: Clear out the form fields after successful submission
    document.getElementById('inputHeader').value = '';
    document.getElementById('inputArticle').value = '';
    document.getElementById('opinionRadio').checked = false;
    document.getElementById('recipeRadio').checked = false;
    document.getElementById('lifeRadio').checked = false;
}