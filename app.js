(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })
    document.addEventListener("DOMContentLoaded", function() {
        const itemsPerPage = 5;
        const items = document.querySelectorAll(".certificate"); 
        const pagination = document.querySelector(".pagination");
        const pages = Math.ceil(items.length / itemsPerPage); 
        let currentPage = 1;
        const maxPageLinks = 5; // 
    
        function showPage(page) {
            items.forEach((item, index) => {
                item.style.display = (Math.floor(index / itemsPerPage) + 1 === page) ? 'block' : 'none';
            });
            updatePagination(page);
        }
    
        function updatePagination(page) {
            const pageLinks = pagination.querySelectorAll(".page");
            pageLinks.forEach((link, index) => {
                console.log('Page Link: ${link.textContent}, Current Page: ${page}')
                link.classList.toggle("active", parseInt(link.textContent, 10) === page);
            });
            pagination.querySelector(".prev").style.display = page === 1 ? 'none' : 'inline';
            pagination.querySelector(".next").style.display = page === pages ? 'none' : 'inline';
        }
    
        function createPaginationLinks() {
            pagination.innerHTML = '';
    
            // Previous button
            pagination.innerHTML += '<a href="#" class="prev">« Previous</a>';
            
    
            // Page numbers
            const numPagesToShow = maxPageLinks - 2; // Mengurangi tombol Previous dan Next
            const half = Math.floor(numPagesToShow / 2);
            const startPage = Math.max(1, currentPage - half);
            const endPage = Math.min(pages, currentPage + half);
    
            if (startPage > 1) {
                pagination.innerHTML += '<a href="#" class="page">1</a>';
                if (startPage > 2) {
                    pagination.innerHTML += ' ... ';
                }
            }
    
            for (let i = startPage; i <= endPage; i++) {
                pagination.innerHTML += `<a href="#" class="page">${i}</a>`;
            }
    
            if (endPage < pages) {
                if (endPage < pages - 1) {
                    pagination.innerHTML += ' ... ';
                }
                pagination.innerHTML += `<a href="#" class="page">${pages}</a>`;
            }
    
            // Next button
            pagination.innerHTML += '<a href="#" class="next">Next »</a>';
        }
    
        createPaginationLinks();
        showPage(currentPage);
    
        pagination.addEventListener("click", function(event) {
            event.preventDefault();
            const target = event.target;
    
            if (target.classList.contains("page")) {
                currentPage = parseInt(target.textContent, 10);
                showPage(currentPage);
            } else if (target.classList.contains("prev") && currentPage > 1) {
                currentPage--;
                showPage(currentPage);
            } else if (target.classList.contains("next") && currentPage < pages) {
                currentPage++;
                showPage(currentPage);
            }
            
            // Recreate pagination links after page change
            createPaginationLinks();
        });
    });
    
      
})();
