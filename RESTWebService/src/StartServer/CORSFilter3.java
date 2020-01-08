package StartServer;

import javax.ws.rs.ext.Provider;

import com.sun.jersey.spi.container.ContainerRequest;
import com.sun.jersey.spi.container.ContainerResponse;
import com.sun.jersey.spi.container.ContainerResponseFilter;

@Provider
public class CORSFilter3 implements ContainerResponseFilter {

	@Override
	public ContainerResponse filter(ContainerRequest request, ContainerResponse response) {
		// TODO Auto-generated method stub
		if (request.getHeaderValue("Origin") != null) {
            response.getHttpHeaders().add("Access-Control-Allow-Origin", request.getHeaderValue("Origin"));
 
            response
                    .getHttpHeaders()
                    .add("Access-Control-Expose-Headers", "Content-Type, Location, Link, Accept, Allow, Retry-After");
 
            response.getHttpHeaders().add("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
 
            response.getHttpHeaders().add("Access-Control-Allow-Credentials", "true");
 
            response.getHttpHeaders().add("Access-Control-Allow-Methods", "OPTIONS, HEAD, GET, POST, PUT, PATCH, DELETE");
        }
		return response;
	}

}
