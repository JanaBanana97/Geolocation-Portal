package WebService;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import entities.Oertlichkeiten;

@Path("OertlichkeitenService")
public class OertlichkeitenService {

	Connection connection;
	Statement statement;
	
	public OertlichkeitenService() throws SQLException{
		connection = DriverManager.getConnection("jdbc:mysql://sql7.freesqldatabase.com:3306/sql7314195",	"sql7314195", "nriJqjZlcz");
		statement = connection.createStatement();	
	}
	
	@GET
	@Consumes({MediaType.TEXT_PLAIN})
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("getLocationByKategorie")
	public List<Oertlichkeiten> getLocationByKategorie(@QueryParam("kategorie") String kategorie){
		List<Oertlichkeiten> returnList = new ArrayList<Oertlichkeiten>();
		try {
			ResultSet rs = statement.executeQuery(
					"SELECT * "
					+ "FROM Oertlichkeiten, Kategorien "
					+ "WHERE Oertlichkeiten.kategorienId = Kategorien.kategorienId AND "
					+ "Kategorien.bezeichnung = '" + kategorie + "' ");
			
			while(rs.next()){
				Oertlichkeiten o = new Oertlichkeiten();
				o.oertlichkeitenId = rs.getInt("Oertlichkeiten.oertlichkeitenId");
				o.bezeichnung = rs.getString("Oertlichkeiten.bezeichnung");
				o.longitude = rs.getString("Oertlichkeiten.longitude");
				o.latitude = rs.getString("Oertlichkeiten.latitude");
				o.strasse = rs.getString("Oertlichkeiten.strasse");
				o.hausnummer = rs.getString("Oertlichkeiten.hausnummer");
				o.postleitzahl = rs.getInt("Oertlichkeiten.postleitzahl");
				o.ort = rs.getString("Oertlichkeiten.ort");
				o.kategorienId = rs.getInt("Oertlichkeiten.kategorienId");
				returnList.add(o);
			}
		}
		catch(Exception e){
			System.out.println(e.toString());
			returnList = null;
		}
		return returnList;
	}
}
