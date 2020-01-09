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
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import entities.Oertlichkeiten;

@Path("OertlichkeitenService")
public class OertlichkeitenService {

	Connection connection;
	Statement statement;
	
	public OertlichkeitenService() throws SQLException, ClassNotFoundException{
		Class.forName("com.mysql.jdbc.Driver");
		connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/test?serverTimezone=UTC", "root", "");
		//connection = DriverManager.getConnection("jdbc:mysql://sql7.freesqldatabase.com:3306/sql7314195",	"sql7314195", "nriJqjZlcz");
		statement = connection.createStatement();	
	}
	
	@GET
	@Consumes({MediaType.TEXT_PLAIN})
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("getAllOertlichkeiten")
	public Response getAllOertlichkeiten(){
		System.out.println("OertlichkeitenService.getAllOertlichkeiten... called.");
		List<Oertlichkeiten> returnList = new ArrayList<Oertlichkeiten>();
		try {
			ResultSet rs = statement.executeQuery(
					"SELECT * "
					+ "FROM Oertlichkeiten ");
			
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
		GenericEntity<List<Oertlichkeiten>> myEntity = new GenericEntity<List<Oertlichkeiten>>(returnList) {};
		return Response.ok(myEntity).build();
		//return returnList;
	}
	
	@GET
	@Consumes({MediaType.TEXT_PLAIN})
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("getLocationByKategorie")
	public List<Oertlichkeiten> getLocationByKategorie(@QueryParam("kategorie") String kategorie){
		System.out.println("OertlichkeitenService.getLocationByKategorie... called.");
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
	
//	@GET
//	@Consumes({MediaType.TEXT_PLAIN})
//	@Produces({ MediaType.APPLICATION_JSON })
//	@Path("getLocationByKategorieAndTyp")
//	public List<Oertlichkeiten> getLocationByKategorieAndTyp(@QueryParam("kategorie") String kategorie, @QueryParam("typ") String typ){
//		System.out.println("OertlichkeitenService.getLocationByKategorieAndTyp... called.");
//		List<Oertlichkeiten> returnList = new ArrayList<Oertlichkeiten>();
//		try {
//			ResultSet rs = statement.executeQuery(
//					"SELECT * "
//					+ " FROM Oertlichkeiten, Kategorien, " + kategorie 
//					+ " WHERE Oertlichkeiten.kategorienId = Kategorien.kategorienId AND "
//					+ " Oertlichkeiten.oertlichkeitenId = " + kategorie + ".oertlichkeitenId AND "
//					+ kategorie  + ".typ = '" + typ + "' AND "
//					+ " Kategorien.bezeichnung = '" + kategorie + "' ");
//			
//			while(rs.next()){
//				Oertlichkeiten o = new Oertlichkeiten();
//				o.oertlichkeitenId = rs.getInt("Oertlichkeiten.oertlichkeitenId");
//				o.bezeichnung = rs.getString("Oertlichkeiten.bezeichnung");
//				o.longitude = rs.getString("Oertlichkeiten.longitude");
//				o.latitude = rs.getString("Oertlichkeiten.latitude");
//				o.strasse = rs.getString("Oertlichkeiten.strasse");
//				o.hausnummer = rs.getString("Oertlichkeiten.hausnummer");
//				o.postleitzahl = rs.getInt("Oertlichkeiten.postleitzahl");
//				o.ort = rs.getString("Oertlichkeiten.ort");
//				o.kategorienId = rs.getInt("Oertlichkeiten.kategorienId");
//				returnList.add(o);
//			}
//		}
//		catch(Exception e){
//			System.out.println(e.toString());
//			returnList = null;
//		}
//		return returnList;
//	}
		
}
