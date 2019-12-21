package StartServer;
import java.io.IOException;

import com.sun.jersey.api.container.httpserver.HttpServerFactory;
import com.sun.net.httpserver.HttpServer;


public class StartServer {
	
	public static void main(String[] args) throws IllegalArgumentException, IOException {
		HttpServer server = HttpServerFactory.create("http://localhost:6098/rest");
		server.start();
		System.out.println("Server gestartet...");
	}
}
