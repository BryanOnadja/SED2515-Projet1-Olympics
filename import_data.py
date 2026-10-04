import pandas as pd
import mysql.connector
from mysql.connector import Error
import os

# Configuration de la connexion à la base de données locale (XAMPP)
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '', # Laisse vide si tu n'as pas de mot de passe XAMPP
    'database': 'olympics_db'
}

def import_csv_to_mysql(csv_file, table_name):
    print(f"--- Début de l'importation pour {table_name} ---")
    if not os.path.exists(csv_file):
        print(f"Erreur : Le fichier {csv_file} est introuvable.")
        return

    try:
        # Lire le fichier CSV avec Pandas
        # L'option index_col=0 permet d'ignorer la colonne d'index s'il y en a une,
        # ou au contraire de gérer la virgule en début de ligne.
        try:
             df = pd.read_csv(csv_file, index_col=0)
        except ValueError:
             # Si ça échoue, c'est qu'il n'y a pas d'index "fantôme", on lit normalement
             df = pd.read_csv(csv_file)
        
        # Nettoyer les noms de colonnes (remplacer les espaces, enlever les caractères spéciaux)
        df.columns = [c.replace(' ', '_').replace('.', '').replace('-', '_') for c in df.columns]

        # Remplacer les valeurs NaN (vides) par None pour MySQL
        df = df.where(pd.notnull(df), None)

        print(f"Fichier {csv_file} lu avec succès. {len(df)} lignes trouvées.")

        # Connexion à MySQL
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

        # 1. Création de la table avec un ID auto-incrémenté
        columns_def = []
        for col, dtype in zip(df.columns, df.dtypes):
            if dtype == 'int64':
                columns_def.append(f"`{col}` INT")
            elif dtype == 'float64':
                columns_def.append(f"`{col}` FLOAT")
            else:
                columns_def.append(f"`{col}` TEXT") # On utilise TEXT pour éviter les problèmes de longueur (VARCHAR)

        create_table_query = f"""
            CREATE TABLE IF NOT EXISTS `{table_name}` (
                `id` INT AUTO_INCREMENT PRIMARY KEY,
                {', '.join(columns_def)}
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        """
        
        cursor.execute(f"DROP TABLE IF EXISTS `{table_name}`;") # On supprime l'ancienne si elle existe pour repartir à zéro
        cursor.execute(create_table_query)
        print(f"Table '{table_name}' créée.")

        # 2. Insertion des données par lots (chunks) pour éviter l'erreur "max_allowed_packet"
        placeholders = ', '.join(['%s'] * len(df.columns))
        insert_query = f"INSERT INTO `{table_name}` ({', '.join([f'`{c}`' for c in df.columns])}) VALUES ({placeholders})"
        
        # On convertit le dataframe en liste de tuples
        data_tuples = [tuple(x) for x in df.to_numpy()]
        
        # On insère les données par paquets de 1000 lignes
        chunk_size = 1000
        for i in range(0, len(data_tuples), chunk_size):
            chunk = data_tuples[i:i + chunk_size]
            cursor.executemany(insert_query, chunk)
            connection.commit()
            print(f"Inséré {min(i + chunk_size, len(data_tuples))}/{len(data_tuples)} lignes...")

        print(f"Importation terminée pour {table_name} !\n")

    except Error as e:
        print(f"Erreur MySQL lors de l'importation de {table_name}: {e}")
    except Exception as e:
        print(f"Erreur lors de l'importation de {table_name}: {e}")
    finally:
        if 'connection' in locals() and connection.is_connected():
            cursor.close()
            connection.close()

# Exécuter l'importation pour les 3 fichiers
if __name__ == "__main__":
    import_csv_to_mysql('Athletes_summer_games.csv', 'athletes_summer_games')
    import_csv_to_mysql('Athletes_winter_games.csv', 'athletes_winter_games')
    import_csv_to_mysql('regions.csv', 'regions')
    print("=== TOUTES LES IMPORTATIONS SONT TERMINÉES ===")