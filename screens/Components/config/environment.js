var environments = {
    staging: {
        FIREBASE_API_KEY: 'AIzaSyCZ28o7X8EPHKNAIjazVEAySFGAp2Rbfj8',
        FIRE_AUTH_DOMAIN: 'sayonaracorona-a91f0.firebaseapp.com',
        FIREBASE_DATABASE_URL: 'https://sayonaracorona-a91f0.firebaseio.com',
        FIREBASE_PROJECT_ID: 'sayonaracorona-a91f0',
        FIREBASE_STORAGE_BUCKET: 'sayonaracorona-a91f0.appspot.com',
        FIREBASE_MESSAGING_SENDER_ID: '326671498604',
        GOOGLE_CLOUD_VISION_API_KEY: 'AIzaSyD9hgo_kGLHpSm-ZZVuf-rCjfOpDTg-2rY',
    },
    production: {

    }
};


function getReleaseChannel() {
	let releaseChannel = Expo.Constants.manifest.releaseChannel;
	if (releaseChannel === undefined) {
		return 'staging';
	} else if (releaseChannel === 'staging') {
		return 'staging';
	} else {
		return 'staging';
	}
}
function getEnvironment(env) {
	console.log('Release Channel: ', getReleaseChannel());
	return environments[env];
}
var Environment = getEnvironment(getReleaseChannel());
export default Environment;