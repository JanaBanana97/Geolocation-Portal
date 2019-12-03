package ws;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.jws.WebService;

import entities.Benutzer;

@WebService(endpointInterface = "ws.IBenutzerService")
public class BenutzerService implements IBenutzerService {
	
	public Connection connection;
	public Statement statement;
	public ResultSet resultSet;

	@Override
	public List<Benutzer> getAllBenutzer() {
		
		List<Benutzer> returnList;
		
		try {
			
			//registrieren
			Class.forName("com.mysql.jdbc.Driver"); 
			
			//verbinden
			//connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/GeoLocationProject?serverTimezone=UTC", "root", "");
			connection = DriverManager.getConnection("jdbc:mysql://sql7.freesqldatabase.com:3306/sql7314195", "sql7314195", "nriJqjZlcz");
			statement = connection.createStatement();
			resultSet = statement.executeQuery("select * from Benutzer");
			
			returnList = new ArrayList<Benutzer>();
			while(resultSet.next()) {
				Benutzer b = new Benutzer();
				b.setBenutzerId(resultSet.getInt("benutzerId"));
				b.setVorname(resultSet.getString("vorname"));
				b.setNachname(resultSet.getString("nachname"));
				b.setEmail(resultSet.getString("email"));
				b.setPasswort(resultSet.getString("passwort"));
				returnList.add(b);
			}
		}
		catch(Exception e) {
			return null;
		}
		return returnList;
	}

}
