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
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import entities.Schulen;

@Path("SchulenService")
public class SchulenService {

	Connection connection;
	Statement statement;
	
	public SchulenService() throws SQLException, ClassNotFoundException{
		Class.forName("com.mysql.jdbc.Driver");
		connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/test?serverTimezone=UTC", "root", "");		
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
				schule.schulenId = rs.getInt("Schulen.schulenId");
				schule.typ = rs.getString("Schulen.typ");
				schule.beschreibung = rs.getString("Schulen.beschreibung");
				schule.oertlichkeitenId = rs.getInt("Schulen.oertlichkeitenId");
				schule.oertlichkeit.oertlichkeitenId = rs.getInt("Oertlichkeiten.oertlichkeitenId");
				schule.oertlichkeit.bezeichnung = rs.getString("Oertlichkeiten.bezeichnung");
				schule.oertlichkeit.longitude = rs.getString("Oertlichkeiten.longitude");
				schule.oertlichkeit.latitude = rs.getString("Oertlichkeiten.latitude");
				schule.oertlichkeit.strasse = rs.getString("Oertlichkeiten.strasse");
				schule.oertlichkeit.hausnummer = rs.getString("Oertlichkeiten.hausnummer");
				schule.oertlichkeit.postleitzahl = rs.getInt("Oertlichkeiten.postleitzahl");
				schule.oertlichkeit.ort = rs.getString("Oertlichkeiten.ort");
				schule.oertlichkeit.kategorienId = rs.getInt("Oertlichkeiten.kategorienId");
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
	
	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("getAllSchulen")
	public List<Schulen> getAllPolitik(){
		System.out.println("getAllSchulen called...");
		List<Schulen> returnList = new ArrayList<Schulen>();
		try {
			ResultSet rs = statement.executeQuery(
					"SELECT * "
					+ "FROM Oertlichkeiten, Schulen "
					+ "WHERE Oertlichkeiten.oertlichkeitenId = Schulen.oertlichkeitenId ");
			
			while(rs.next()){
				Schulen schulen = new Schulen();
				schulen.schulenId = rs.getInt("Schulen.schulenId");
				schulen.typ = rs.getString("Schulen.typ");
				schulen.beschreibung = rs.getString("Schulen.beschreibung");
				schulen.oertlichkeitenId = rs.getInt("Schulen.oertlichkeitenId");
				schulen.oertlichkeit.oertlichkeitenId = rs.getInt("Oertlichkeiten.oertlichkeitenId");
				schulen.oertlichkeit.bezeichnung = rs.getString("Oertlichkeiten.bezeichnung");
				schulen.oertlichkeit.longitude = rs.getString("Oertlichkeiten.longitude");
				schulen.oertlichkeit.latitude = rs.getString("Oertlichkeiten.latitude");
				schulen.oertlichkeit.strasse = rs.getString("Oertlichkeiten.strasse");
				schulen.oertlichkeit.hausnummer = rs.getString("Oertlichkeiten.hausnummer");
				schulen.oertlichkeit.postleitzahl = rs.getInt("Oertlichkeiten.postleitzahl");
				schulen.oertlichkeit.ort = rs.getString("Oertlichkeiten.ort");
				schulen.oertlichkeit.kategorienId = rs.getInt("Oertlichkeiten.kategorienId");
				returnList.add(schulen);
			}
		}
		catch(Exception e){
			System.out.println(e.toString());
			System.out.println(e.getMessage());
			System.out.println(e.getCause());
			returnList = null;
		}
		return returnList;
	}
}
