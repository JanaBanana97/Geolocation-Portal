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
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import entities.Gesundheit;

@Path("GesundheitService")
public class GesundheitService {

	Connection connection;
	Statement statement;
	
	public GesundheitService() throws SQLException, ClassNotFoundException{
		Class.forName("com.mysql.jdbc.Driver");
		connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/test?serverTimezone=UTC", "root", "");		
		//connection = DriverManager.getConnection("jdbc:mysql://sql7.freesqldatabase.com:3306/sql7314195",	"sql7314195", "nriJqjZlcz");
		statement = connection.createStatement();	
	}
	
	@GET
	@Consumes({MediaType.TEXT_PLAIN})
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("getGesundheit")
	public Response getGesundheit(@QueryParam("oertlichkeitenId") String oertlichkeitenId){
		System.out.println("getGesundheit called...");
		Gesundheit gesundheit = new Gesundheit();
		try {
			ResultSet rs = statement.executeQuery(
					"SELECT * "
					+ "FROM Oertlichkeiten, Gesundheit "
					+ "WHERE Oertlichkeiten.oertlichkeitenId = Gesundheit.oertlichkeitenId AND "
					+ "Oertlichkeiten.oertlichkeitenId = " + oertlichkeitenId);
			
			while(rs.next()){
				gesundheit.gesundheitsId = rs.getInt("Gesundheit.gesundheitId");
				gesundheit.typ = rs.getString("Gesundheit.typ");
				gesundheit.beschreibung = rs.getString("Gesundheit.beschreibung");
				gesundheit.oertlichkeitenId = rs.getInt("Gesundheit.oertlichkeitenId");
				gesundheit.oertlichkeit.oertlichkeitenId = rs.getInt("Oertlichkeiten.oertlichkeitenId");
				gesundheit.oertlichkeit.bezeichnung = rs.getString("Oertlichkeiten.bezeichnung");
				gesundheit.oertlichkeit.longitude = rs.getString("Oertlichkeiten.longitude");
				gesundheit.oertlichkeit.latitude = rs.getString("Oertlichkeiten.latitude");
				gesundheit.oertlichkeit.strasse = rs.getString("Oertlichkeiten.strasse");
				gesundheit.oertlichkeit.hausnummer = rs.getString("Oertlichkeiten.hausnummer");
				gesundheit.oertlichkeit.postleitzahl = rs.getInt("Oertlichkeiten.postleitzahl");
				gesundheit.oertlichkeit.ort = rs.getString("Oertlichkeiten.ort");
				gesundheit.oertlichkeit.kategorienId = rs.getInt("Oertlichkeiten.kategorienId");
			}
		}
		catch(Exception e){
			System.out.println(e.toString());
			System.out.println(e.getMessage());
			System.out.println(e.getCause());
			gesundheit = null;
		}
		//return gesundheit;
		GenericEntity<Gesundheit> myEntity = new GenericEntity<Gesundheit>(gesundheit) {};
		return Response.ok(myEntity).build();
	}
	
	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("getAllGesundheit")
	public Response getAllGesundheit(){
		System.out.println("getAllGesundheit called...");
		List<Gesundheit> returnList = new ArrayList<Gesundheit>();
		try {
			ResultSet rs = statement.executeQuery(
					"SELECT * "
					+ "FROM Oertlichkeiten, Gesundheit "
					+ "WHERE Oertlichkeiten.oertlichkeitenId = Gesundheit.oertlichkeitenId ");
			
			while(rs.next()){
				Gesundheit gesundheit = new Gesundheit();
				gesundheit.gesundheitsId = rs.getInt("Gesundheit.gesundheitId");
				gesundheit.typ = rs.getString("Gesundheit.typ");
				gesundheit.beschreibung = rs.getString("Gesundheit.beschreibung");
				gesundheit.oertlichkeitenId = rs.getInt("Gesundheit.oertlichkeitenId");
				gesundheit.oertlichkeit.oertlichkeitenId = rs.getInt("Oertlichkeiten.oertlichkeitenId");
				gesundheit.oertlichkeit.bezeichnung = rs.getString("Oertlichkeiten.bezeichnung");
				gesundheit.oertlichkeit.longitude = rs.getString("Oertlichkeiten.longitude");
				gesundheit.oertlichkeit.latitude = rs.getString("Oertlichkeiten.latitude");
				gesundheit.oertlichkeit.strasse = rs.getString("Oertlichkeiten.strasse");
				gesundheit.oertlichkeit.hausnummer = rs.getString("Oertlichkeiten.hausnummer");
				gesundheit.oertlichkeit.postleitzahl = rs.getInt("Oertlichkeiten.postleitzahl");
				gesundheit.oertlichkeit.ort = rs.getString("Oertlichkeiten.ort");
				gesundheit.oertlichkeit.kategorienId = rs.getInt("Oertlichkeiten.kategorienId");
				returnList.add(gesundheit);
			}
		}
		catch(Exception e){
			System.out.println(e.toString());
			System.out.println(e.getMessage());
			System.out.println(e.getCause());
			returnList = null;
		}
		GenericEntity<List<Gesundheit>> myEntity = new GenericEntity<List<Gesundheit>>(returnList) {};
		return Response.ok(myEntity).build();
		//return returnList;
	}
	
	@PUT
	@Consumes({MediaType.TEXT_PLAIN})
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("addGesundheit")
	public Response addGesundheit(@QueryParam("bezeichnung") String bezeichnung, @QueryParam("longitude") String longitude, @QueryParam("latitude") String latitude,
			@QueryParam("strasse") String strasse, @QueryParam("hausnummer") String hausnummer, @QueryParam("plz") int plz,
			@QueryParam("ort") String ort, @QueryParam("kategorie") String Kategorie, @QueryParam("typ") String typ,
			@QueryParam("beschreibung") String beschreibung){
		System.out.println("GesundheitService/addGesundheit... called.");
		try {
			boolean erfolgreich1 = statement.execute("INSERT INTO Oertlichkeiten (bezeichnung, longitude, latitude, strasse, hausnummer, postleitzahl, ort, kategorienId) "
					+ "VALUES ('" + bezeichnung + "', '" + longitude + "', '" + latitude + "', '" + strasse + "', "
					+ "'+" + hausnummer + "', " + plz + ", '" + ort + "', 3");
			
			ResultSet rs = statement.executeQuery("SELECT * FROM Oertlichkeiten"
					+ " WHERE longitude='" + longitude + "' AND latitude='" + latitude + " ");
			
			int oertlichkeitenId = rs.getInt("Oertlichkeiten.oertlichkeitenId");
			
			boolean erfolgreich2 = statement.execute("INSERT INTO Gesundheit (typ, beschreibung, oertlichkeitenId) "
					+ "VALUES ('" + typ + "', '" + beschreibung + "', " + oertlichkeitenId + ") ");
		}
		catch(Exception e){
			System.out.println(e.toString());
			return Response.serverError().build();
		}
		
		return Response.ok().build();
	}

}
