// Make sure we wait to attach our handlers until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
        console.info('DOM loaded');
    }

    // UPDATE
    const changeDevouredBtns = document.querySelectorAll('.change-devoured');

    // Set up the event listener for the create button
    if (changeDevouredBtns) {
        changeDevouredBtns.forEach((button) => {
            button.addEventListener('click', (e) => {
                // Grabs the id fo the element that goes by the name "id"
                const id = e.target.getAttribute('data-id');
                const newDevoured = e.target.getAttribute('data-newdevoured');

                const newDevouredState = {
                    devoured: newDevoured,
                };

                fetch(`/api/boigas/${id}`, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },

                    // make sure to serialize the JSON body
                    body: JSON.stringify(newDevouredState),
                }).then((response) => {
                    // Check that the response is all good
                    // Reload the page so the user can see the new quote
                    if (response.ok) {
                        console.log(`changed devoured to: ${newDevoured}`);
                        location.reload('/');
                    } else {
                        alert('something went wrong :( ');
                    }
                });
            });
        });
    }

    // CREATE 
    const createBoigaBtn = document.getElementById('create-form');

    if (createBoigaBtn) {
        createBoigaBtn.addEventListener('submit', (e) => {
            e.preventDefault();

            // Grabs the value of the textarea that goes by the name, 'quote'
            const newBoiga = {              // HERE --> cats.js says 'ca' for id ? --> boig?
                name: document.getElementById('ca').value.trim(),
                devoured: document.getElementById('devoured').checked,
            };

        // Send POST requrest to create a new quote
        fetch('/api/boigas', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

            // make sure to serialize the JSON body
            body: JSON.stringify(newBoiga),
        }).then(() => {
            // Empty the form           // another 'ca' HERE
            document.getElementById('ca').value = '';

            // Reload the page so the user can see the new quote
            console.log('Created a new boiga!');
            location.reload();
        });
     });
    }

    // DELETE
    const deleteBoigaBtns = document.querySelectorAll('.delete-boiga');

    // Set up the event listeners for each delete buton
    deleteBoigaBtns.forEach((button) => {
        button.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');

            // Send the delete requrest
            fetch(`/api/boigas/${id}`, {
                method: 'DELETE',
            }).then((res) => {
                console.log(res);
                console.log(`Deleted boiga: ${id}`);

                // Reload the page
                location.reload();
            });
        });
    });
});