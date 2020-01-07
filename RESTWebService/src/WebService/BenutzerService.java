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

import entities.Benutzer;

@Path("BenutzerService")
public class BenutzerService {
	
	Connection connection;
	Statement statement;
	
	public BenutzerService() throws SQLException, ClassNotFoundException{
		Class.forName("com.mysql.jdbc.Driver");
		connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/test?serverTimezone=UTC", "root", "");		
		//connection = DriverManager.getConnection("jdbc:mysql://sql7.freesqldatabase.com:3306/sql7314195",	"sql7314195", "nriJqjZlcz");
		
		statement = connection.createStatement();
	}

	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("getAllBenutzer")
	public List<Benutzer> getAllBenutzer() {
		System.out.println("BenutzerService.getAllBenutzer... called.");
		List<Benutzer> returnList = new ArrayList<Benutzer>();
		try {
			//registrieren
			Class.forName("com.mysql.jdbc.Driver");
			
			//verbinden
			//Connection connection = DriverManager.getConnection("jdbc:mysql://sql7.freesqldatabase.com:3306/sql7314195",	"sql7314195", "nriJqjZlcz");
			//Statement statement = connection.createStatement();
			ResultSet resultSet = statement.executeQuery("SELECT * FROM Benutzer");
			
			while(resultSet.next()){
				Benutzer b = new Benutzer();
				b.benutzerId = resultSet.getInt("benutzerId");
				b.vorname = resultSet.getString("vorname");
				b.nachname = resultSet.getString("nachname");
				b.email = resultSet.getString("email");
				b.passwort = resultSet.getString("passwort");
				returnList.add(b);
			}
		}
		catch(Exception e){
			System.out.println(e.toString());
			returnList = null;
		}
		return returnList;
	}
	
	@GET
	@Produces({ MediaType.TEXT_PLAIN })
	@Consumes({ MediaType.TEXT_PLAIN })
	@Path("checkBenutzer")
	public String checkBenutzer(@QueryParam("email") String email, @QueryParam("passwort") String passwort){
		System.out.println("BenutzerService.getAllBenutzer... called.");
		String returnValue = Boolean.FALSE.toString();
		try {
			
			returnValue = returnValue + email + passwort;
			
			ResultSet rs = statement.executeQuery("SELECT * FROM Benutzer "
					+ " WHERE email='" + email + "' AND passwort='" + passwort + "'");
			
			if (rs.isBeforeFirst() != false){
				returnValue = Boolean.TRUE.toString();
			}
		}
		catch(Exception e){
			System.out.println(e.toString());
			returnValue = Boolean.TRUE.toString();
		}
		return returnValue;
	}
}
