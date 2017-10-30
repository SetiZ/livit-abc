const PIN_APP = '4930170613951121384'
const PIN_FIELDS = 'id,name,image[small]'
const PIN_SCOPE = 'read_public, write_public'

const BACKEND_URL='https://api.pinterest.com/v1/'

export default {
	PDK.init({ appId: PIN_APP, cookie: true })
	  /*
	     *  Use the SDK to login to Pinterest
	     *  @param {Function} callback - function fired on completion
	     */
	  login: (callback) => {
	  	console.log("login")
	    PDK.login({ scope: PIN_SCOPE }, callback)
	  },
	  /*
	     *  Use the SDK to logout of Pinterest
	     */
	  logout: function () {
	    PDK.logout()
	  },
	  /*
	     *  Use DK to determine auth state of user
	     *  @returns {Boolean}
	     */
	  loggedIn: function () {
	    return !!PDK.getSession()
	  },
	  /*
	     *  Use SDK to create a new Pin
	     *  @param {Object}   data     - {board, note, link, image_url}
	     *  @param {Function} callback - function fired on completion
	     */
	  createPin: function (data, callback) {
	    PDK.request('/pins/', 'POST', data, callback)
	  },
	  /*
	     *  Use SDK to request current users boards
	     *  @param {Function} callback - function fired on completion
	     */
	  myBoards: function (callback) {
	    PDK.me('boards', { fields: PIN_FIELDS }, callback)
	  }
}