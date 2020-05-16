const trackGAEvents = (category, action, label) => {

	window.dataLayer = window.dataLayer || [];

	window.dataLayer.push({
	  event: 'Click Events',
	  category: category,
	  action: action,
	  label: label
	})
}

export { trackGAEvents };
