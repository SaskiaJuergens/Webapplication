<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Admin Spiele</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
      integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
      crossorigin="anonymous"
    />
    <link
      rel="stylesheet"
      type="text/css"
      media="screen"
      href="../css/style.css"
    />
    <script src="main.js"></script>
  </head>
  <body>
    <div class="colored-background">
    <nav class="navbar navbar-expand-lg navbar-dark navbar-custom">
        <a href="../html/startscreen.html" Link class="logo">
          <img src="../images/slacklogo.png" alt="Logo" />
        </a>

        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active nav-item-custom">
              <a class="nav-link" href="Spiel.html"
                >Spielen <span class="sr-only">(current)</span></a
              >
            </li>

            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Spieleinstellungen
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="../html/SpielEinstellungen.html"
                  >Spielverwaltung</a
                >
                <a class="dropdown-item" href="../html/adminSpielinhalt.html"
                  >Spielinhalt</a
                >

                <a class="dropdown-item" href="../html/adminSpielstand.html"
                  >Spielstand</a
                >
              </div>
            </li>
            <li class="nav-item active nav-item-custom">
              <a class="nav-link" href="../html/login.html"
                >Login <span class="sr-only">(current)</span></a
              >
            </li>
            <li class="nav-item active nav-item-custom">
              <a class="nav-link" href="../html/Impressum.html"
                >Impressum <span class="sr-only">(current)</span></a
              >
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-light my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>

      <div class="table-background">
        <h1><b>Level</b></h1>
                <p>Alle vorhandenen Spiellevel</p>
                <div style="overflow-x: auto">
                    <table style="width: 100%">
                        <thread>
                            <tr>
                                <td>Level</td>
                                <td>Spielzeit</td>
                                <td>Kartenanzahl</td>
                            </tr>
                        </thread>

                        <tbody>
                          
                            <?php

                            //Lese Daten ein aus Datenbank
                            $con = mysqli_connect("localhost", "root", "");
                            mysqli_select_db($con, "omemory");
                            $result = mysqli_query($con, "SELECT * FROM level");

                                                   
                            //check connection
                            if($con->connect_error){
                            die("Connection failed: " . $connection->connect_error);
                            }

                            if(!$result){
                            die("Invalid query: " . $connection->error);
                            }

                            while ($row = $result->fetch_assoc()){
                            echo "<tr>
                                    <td>" . $row["Level"] . "</td>
                                    <td>" . $row["anzahl_karten"] . "</td>
                                    <td>" . $row["spielZeit"] . "</td>
                                  </tr>";

                            }

                            ?>
                        </tbody>
                    </table>
                </div>
                <br />
          


        <h1><b>Spiel</b></h1>
            <p>Alle Spiele</p>
            <div style="overflow-x: auto">
                <table style="width: 100%">
                    <thread>
                       <tr>
                        <td>Datum</th>
                        <td>Level</th>
                        <td>Dauer</th>
                        <td>Spielart</th>
                        <td>Spieler</th>
                        <td>Gewinner</th>
                        <td>Verlauf</th>
                       </tr>
                    </thread>

                        <tbody>
                          
                            <?php

                            //Lese Daten ein aus Datenbank
                            $con = mysqli_connect("localhost", "root", "");
                            mysqli_select_db($con, "omemory");
                            $result = mysqli_query($con, "SELECT * FROM spiel");

                                                   
                            //check connection
                            if($con->connect_error){
                            die("Connection failed: " . $connection->connect_error);
                            }

                            if(!$result){
                            die("Invalid query: " . $connection->error);
                            }

                            while ($row = $result->fetch_assoc()){
                            echo "<tr>
                                    <td>" . $row["Datetime"] . "</td>
                                    <td>" . $row["level"] . "</td>
                                    <td>" . $row["dauer"] . "</td>
                                    <td>" . $row["gametyp"] . "</td>
                                    <td>" . $row["mitspieler"] . "</td>
                                    <td>" . $row["gewinner"] . "</td>
                                    <td>" . $row["gameprocess"] . "</td>
                                  </tr>";
                            } ?>
                        </tbody>
                </table>
            </div>
      </div>
      <br/>
 

    <script
      src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
      integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
      integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
      integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
      crossorigin="anonymous"
    ></script>
  </body>
</html>