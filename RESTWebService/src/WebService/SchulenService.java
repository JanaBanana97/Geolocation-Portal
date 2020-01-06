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
import entities.Schulen;

@Path("SchulenService")
public class SchulenService {

	Connection connection;
	Statement statement;
	
	public SchulenService() throws SQLException, ClassNotFoundException{
		Class.forName("org.postgresql.Driver");
		connection = DriverManager.getConnection(Customizing.URL, Customizing.USER, Customizing.PASSWORD);		
		//connection = DriverManager.getConnection("jdbc:mysql://sql7.freesqldatabase.com:3306/sql7314195",	"sql7314195", "nriJqjZlcz");
		statement = connection.createStatement();	
	}
	
	@GET
	@Consumes({MediaType.TEXT_PLAIN})
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("getSchule")
	public Schulen getSchule (@QueryParam("oertlichkeitenId") String oertlichkeitenId){
		System.out.println("getSchule called...");
		Schulen schule = new Schulen();
		try {
			ResultSet rs = statement.executeQuery(
					"SELECT * "
					+ "FROM Oertlichkeiten, Schulen "
					+ "WHERE Oertlichkeiten.oertlichkeitenId = Schulen.oertlichkeitenId AND "
					+ "Oertlichkeiten.oertlichkeitenId = " + oertlichkeitenId);
			
			while(rs.next()){
				schule.schulenId = rs.getInt("schulenId");
				schule.typ = rs.getString("typ");
				schule.beschreibung = rs.getString("beschreibung");
				schule.oertlichkeitenId = rs.getInt("oertlichkeitenId");
				schule.oertlichkeit.oertlichkeitenId = rs.getInt("oertlichkeitenId");
				schule.oertlichkeit.bezeichnung = rs.getString("bezeichnung");
				schule.oertlichkeit.longitude = rs.getString("longitude");
				schule.oertlichkeit.latitude = rs.getString("latitude");
				schule.oertlichkeit.strasse = rs.getString("strasse");
				schule.oertlichkeit.hausnummer = rs.getString("hausnummer");
				schule.oertlichkeit.postleitzahl = rs.getInt("postleitzahl");
				schule.oertlichkeit.ort = rs.getString("ort");
				schule.oertlichkeit.kategorienId = rs.getInt("kategorienId");
			}
		}
		catch(Exception e){
			System.out.println(e.toString());
			System.out.println(e.getMessage());
			System.out.println(e.getCause());
			schule = null;
		}
		return schule;
	}
}
