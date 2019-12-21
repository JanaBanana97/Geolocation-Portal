package WebService;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;


@Path("RestTestService")
public class RestTestService {

	@GET
	@Produces({ MediaType.TEXT_PLAIN })
	@Consumes({MediaType.TEXT_PLAIN})
	@Path("addiere")
	public int addiere(@QueryParam("zahlA") int zahlA, @QueryParam("zahlB") int zahlB) {
		System.out.println("RestTestService.addiere... called.");
		return (zahlA + zahlB);
	}
}
