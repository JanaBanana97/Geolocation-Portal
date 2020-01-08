package StartServer;

import javax.ws.rs.ext.Provider;

import com.sun.jersey.spi.container.ContainerRequest;
import com.sun.jersey.spi.container.ContainerRequestFilter;
import com.sun.jersey.spi.container.ContainerResponse;
import com.sun.jersey.spi.container.ContainerResponseFilter;

@Provider
public class CORSFilter2 implements ContainerRequestFilter, ContainerResponseFilter {

	/**
     * A preflight request is an OPTIONS request
     * with an Origin header.
     */
    private static boolean isPreflightRequest(ContainerRequest request) {
        return request.getHeaderValue("Origin") != null
                && request.getMethod().equalsIgnoreCase("OPTIONS");
    }

    
	@Override
	public ContainerResponse filter(ContainerRequest request, ContainerResponse response) {
		// if there is no Origin header, then it is not a
        // cross origin request. We don't do anything.
        if (request.getHeaderValue("Origin") == null) {
            return response;
        }

        // If it is a preflight request, then we add all
        // the CORS headers here.
        if (isPreflightRequest(request)) {
		response.getHttpHeaders().add("Access-Control-Allow-Credentials", "true");
            	response.getHttpHeaders().add("Access-Control-Allow-Methods",
                "GET, POST, PUT, DELETE, OPTIONS, HEAD");
            	response.getHttpHeaders().add("Access-Control-Allow-Headers",
                // Whatever other non-standard/safe headers (see list above)
                // you want the client to be able to send to the server,
                // put it in this list. And remove the ones you don't want.
                "X-Requested-With, Authorization, " +
                "Accept-Version, Content-MD5, CSRF-Token");
        }

        // Cross origin requests can be either simple requests
        // or preflight request. We need to add this header
        // to both type of requests. Only preflight requests
        // need the previously added headers.
        response.getHttpHeaders().add("Access-Control-Allow-Origin", "*");
        
        return response;
	}

	@Override
	public ContainerRequest filter(ContainerRequest request) {
		// TODO Auto-generated method stub
		// If it's a preflight request, we abort the request with
        // a 200 status, and the CORS headers are added in the
        // response filter method below.
        if (isPreflightRequest(request)) {
            return request;
        }
		return request;
	}

}
