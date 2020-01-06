package WebService;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import Customizing.Customizing;
import entities.Gesundheit;

@Path("GesundheitService")
public class GesundheitService {

	Connection connection;
	Statement statement;
	
	public GesundheitService() throws SQLException, ClassNotFoundException{
		Class.forName("org.postgresql.Driver");
		connection = DriverManager.getConnection(Customizing.URL, Customizing.USER, Customizing.PASSWORD);		
		//connection = DriverManager.getConnection("jdbc:mysql://sql7.freesqldatabase.com:3306/sql7314195",	"sql7314195", "nriJqjZlcz");
		statement = connection.createStatement();	
	}
	
	@GET
	@Consumes({MediaType.TEXT_PLAIN})
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("getGesundheit")
	public Gesundheit getGesundheit(@QueryParam("oertlichkeitenId") String oertlichkeitenId){
		System.out.println("getGesundheit called...");
		Gesundheit gesundheit = new Gesundheit();
		try {
			ResultSet rs = statement.executeQuery(
					"SELECT * "
					+ "FROM Oertlichkeiten, Gesundheit "
					+ "WHERE Oertlichkeiten.oertlichkeitenId = Gesundheit.oertlichkeitenId AND "
					+ "Oertlichkeiten.oertlichkeitenId = " + oertlichkeitenId);
			
			while(rs.next()){
				gesundheit.gesundheitsId = rs.getInt("gesundheitId");
				gesundheit.typ = rs.getString("typ");
				gesundheit.beschreibung = rs.getString("beschreibung");
				gesundheit.oertlichkeitenId = rs.getInt("oertlichkeitenId");
				gesundheit.oertlichkeit.oertlichkeitenId = rs.getInt("oertlichkeitenId");
				gesundheit.oertlichkeit.bezeichnung = rs.getString("bezeichnung");
				gesundheit.oertlichkeit.longitude = rs.getString("longitude");
				gesundheit.oertlichkeit.latitude = rs.getString("latitude");
				gesundheit.oertlichkeit.strasse = rs.getString("strasse");
				gesundheit.oertlichkeit.hausnummer = rs.getString("hausnummer");
				gesundheit.oertlichkeit.postleitzahl = rs.getInt("postleitzahl");
				gesundheit.oertlichkeit.ort = rs.getString("ort");
				gesundheit.oertlichkeit.kategorienId = rs.getInt("kategorienId");
			}
		}
		catch(Exception e){
			System.out.println(e.toString());
			System.out.println(e.getMessage());
			System.out.println(e.getCause());
			gesundheit = null;
		}
		return gesundheit;
	}
}
