/**
 * Highlight search terms in text
 */
export function highlightSearchTerm(text, searchQuery) {
  if (!searchQuery || !text) return text;
  
  const regex = new RegExp(`(${searchQuery})`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, index) => {
    if (part.toLowerCase() === searchQuery.toLowerCase()) {
      return (
        <mark key={index} className="bg-lavender/30 text-white px-0.5 rounded">
          {part}
        </mark>
      );
    }
    return part;
  });
}

/**
 * Improved search algorithm - case-insensitive, partial matches
 */
export function searchItems(items, query, searchFields) {
  if (!query || !query.trim()) return items;
  
  const searchTerm = query.toLowerCase().trim();
  
  return items.filter(item => {
    return searchFields.some(field => {
      const fieldValue = item[field];
      if (!fieldValue) return false;
      
      // Handle arrays (like tags)
      if (Array.isArray(fieldValue)) {
        return fieldValue.some(val => {
          const valStr = typeof val === 'object' ? val.name || val.toString() : val.toString();
          return valStr.toLowerCase().includes(searchTerm);
        });
      }
      
      // Handle strings
      return fieldValue.toString().toLowerCase().includes(searchTerm);
    });
  });
}
