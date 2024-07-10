const capitalizeFirstLetter = (s: String): String => {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const calculate_total_page = (total_items: number, items_per_page: number) => {
  var total
  if (total_items % items_per_page === 0) {
    total = total_items / items_per_page
  } else {
    total = Math.floor(total_items / items_per_page) + 1
  }
  return total
}

export { capitalizeFirstLetter, calculate_total_page }
