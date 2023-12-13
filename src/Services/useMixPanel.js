import mixpanel from 'mixpanel-browser';

export const useMixpanelComposable = () => {
	const mixpanelEvent = (event, payload) => mixpanel.track(event, payload);

	return { mixpanelEvent };
};