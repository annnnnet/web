const available = document.getElementById('available');
const availableBtn = document.getElementById('availableBtn');

const form = document.getElementById('form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const status = document.getElementById('status').value;
        fetch('http://127.0.0.1:5000/commodity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    name,
                    status,
                },
            ),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const result = document.getElementById('result');
                result.innerHTML = '<h5>Successfully added</h5>';
            });
    });
}

let output = ' ';

function getAvailable() {
    fetch('http://127.0.0.1:5000/commodity')
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                if (item.status === 'Available') {
                    output += `
            <a href="#" class="card card-sale" data-id=${item.id}>
                      ${item.name}
                      <span id="delete-stuff">×</span>
            </a>
            `;
                    available.innerHTML = output;
                }
            });
        });
}

available.addEventListener('click', (e) => {
    e.preventDefault();
    const delBtn = e.target.id === 'delete-stuff';
    const { id } = e.target.parentElement.dataset;
    if (delBtn) {
        fetch(`http://127.0.0.1:5000/commodity/${id}`, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            // eslint-disable-next-line no-restricted-globals
            .then(() => location.reload());
    }
});
availableBtn.addEventListener('click', getAvailable);
