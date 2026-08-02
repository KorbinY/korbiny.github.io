const citationCountElements = document.querySelectorAll('[data-semantic-scholar-id]');
citationCountElements.forEach(element => {
    const id = element.getAttribute('data-semantic-scholar-id');
    if (id) {
        element.setAttribute('data-semantic-scholar-id', id.toLowerCase());
    }
});

const semanticScholarIds = new Set(Array.from(citationCountElements).map(element => element.getAttribute('data-semantic-scholar-id')).filter(id => id));

let uncachedSemanticScholarIds = [];
semanticScholarIds.forEach(id => {
    const cacheKey = `semanticScholarCitationCount:${id}`;
    let cachedData = null;
    try {
        cachedData = localStorage.getItem(cacheKey);
    } catch (error) {
        // Storage can be unavailable in private or restricted browsing contexts.
    }
    if (cachedData) {
        try {
            const { timestamp } = JSON.parse(cachedData);
            // If cached data is older than 1 hour, consider it uncached
            if (!timestamp || Date.now() - timestamp > 1 * 60 * 60 * 1000) {
                uncachedSemanticScholarIds.push(id);
            }
        } catch (error) {
            uncachedSemanticScholarIds.push(id);
        }
    } else {
        uncachedSemanticScholarIds.push(id);
    }
});

let showSemanticScholarCitationCount = () => {
    // Update the DOM with the cached citation counts
    semanticScholarIds.forEach(id => {
        const cacheKey = `semanticScholarCitationCount:${id}`;
        let cachedData = null;
        try {
            cachedData = localStorage.getItem(cacheKey);
        } catch (error) {
            return;
        }
        if (cachedData) {
            let citationCount;
            try {
                ({ citationCount } = JSON.parse(cachedData));
            } catch (error) {
                return;
            }
            if (!Number.isFinite(Number(citationCount))) return;
            const elements = document.querySelectorAll(`[data-semantic-scholar-id="${id}"]`);
            elements.forEach(element => {
                element.innerHTML = `<a class="badge badge-pill badge-publication badge-info" href="https://www.semanticscholar.org/paper/${id}" target="_blank"><i class="ai ai-semantic-scholar"></i> ${parseInt(citationCount).toLocaleString()} citations</a>`;
            });
        }
    });
};

if (uncachedSemanticScholarIds.length > 0) {
    const requestedIds = Array.from(semanticScholarIds);
    fetch('https://api.semanticscholar.org/graph/v1/paper/batch?fields=citationCount', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ids: requestedIds
        })
    }).then(response => {
        if (!response.ok) throw new Error(`Semantic Scholar request failed: ${response.status}`);
        return response.json();
    }).then(data => {
        if (!Array.isArray(data)) return;
        data.forEach((paper, index) => {
            const requestedId = requestedIds[index];
            if (!paper || !requestedId) return;
            // Cache citation count data
            const cacheKey = `semanticScholarCitationCount:${requestedId}`;
            const cacheData = {
                citationCount: paper.citationCount,
                timestamp: Date.now()
            };
            try {
                localStorage.setItem(cacheKey, JSON.stringify(cacheData));
            } catch (error) {
                // The live value remains optional when storage is unavailable.
            }
        });
    }).catch(error => {
        console.error('Error fetching Semantic Scholar data:', error);
    }).finally(showSemanticScholarCitationCount);
} else {
    showSemanticScholarCitationCount();
}
