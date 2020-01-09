package WebService;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import entities.Maengel;
import entities.Schulen;

@Path("MaengelService")
public class MaengelService {

	Connection connection;
	Statement statement;
	
	public MaengelService() throws ClassNotFoundException, SQLException{
		Class.forName("com.mysql.jdbc.Driver");
		connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/test?serverTimezone=UTC", "root", "");		
		//connection = DriverManager.getConnection("jdbc:mysql://sql7.freesqldatabase.com:3306/sql7314195",	"sql7314195", "nriJqjZlcz");
		statement = connection.createStatement();
	}
	
	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("getAllMaengel")
	public Response getAllMaengel (){
		System.out.println("getAllMaengel called...");
		List<Maengel> returnList = new ArrayList<Maengel>();
		try {
			ResultSet rs = statement.executeQuery(
					"SELECT * "
					+ "FROM Maengel ");
			
			while(rs.next()){
				Maengel mangel = new Maengel();
				mangel.maengelID = rs.getInt("Maengel.maengelId");
				mangel.beschreibung = rs.getString("Maengel.beschreibung");
				mangel.latitude = rs.getString("Maengel.longitude");
				mangel.longitude = rs.getString("Maengel.latitude");
				mangel.status = rs.getString("Maengel.status");
				returnList.add(mangel);
			}
		}
		catch(Exception e){
			System.out.println(e.toString());
			System.out.println(e.getMessage());
			System.out.println(e.getCause());
			returnList = null;
		}
		GenericEntity<List<Maengel>> myEntitiy = new GenericEntity<List<Maengel>>(returnList) {};
		return Response.ok(myEntitiy).build();
		//return returnList;
	}
	
	@GET
	@Consumes({MediaType.TEXT_PLAIN})
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("addMangel")
	public Response addMangel (@QueryParam("beschreibung") String beschreibung, @QueryParam("longitude") String longitude, 
			@QueryParam("latitude") String latitude, @QueryParam("status") String status){
		System.out.println("addMangel called...");
		Maengel mangel = new Maengel();
		mangel.beschreibung = beschreibung;
		mangel.longitude = longitude;
		mangel.latitude = latitude;
		mangel.status = status;
		
		try {			
			boolean insert = statement.execute
					("INSERT INTO Maengel (beschreibung, longitude, latitude, status) "
					+ " VALUES ('" + mangel.beschreibung + "', '" + mangel.longitude + "',"
					+ "'" + mangel.latitude + "'," + mangel.status + "') ");
			
			if (!insert){
				mangel = null;
			}
			
		}
		catch(Exception e){
			System.out.println(e.toString());
			System.out.println(e.getMessage());
			System.out.println(e.getCause());
			mangel = null;
		}
		GenericEntity<Maengel> myEntity = new GenericEntity<Maengel>(mangel) {};
		return Response.ok(myEntity).build();
		//return mangel;
	}
}
