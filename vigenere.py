def vigenere(chaine, cle, decode=False):
    code = ""

    for i, c in enumerate(chaine):
        d = cle[i % len(cle)]
        d = ord(d) - 65
        if decode: d = 26 - d
        code += chr((ord(c)-65+d) % 26 + 65)

    return code

def decodeV(chaine, cle):
    return vigenere(chaine, cle, True)

def codeV(chaine, cle):
    return vigenere(chaine, cle)

def PGCD(m, n):
    if m <= 0 or n <= 0: raise Exception("Impossible de calculer le PGCD")
    if m == 1 or n == 1: return 1
    if m == n: return m
    if m < n: return PGCD(m, n-m)

    return PGCD(n, m-n)

def estimationLongueurCle(chaine, mot = 1, longueur_suffisante=3) :
    """
    Détermine la longueur de la clé.
    Repérage des groupes de "mot" lettres qui se répètent dans la chaine codée.
    Suppose qu'il y a une forte probabilité qu'un même groupe de trois lettres
    soit codé avec les mêmes trois lettres de la clé.

    Exemple: mot=3
    message  : .....DES...........DES...........DES.........DES....DES
    cle      : ABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCD
    code     : .....EGV.........................EGV.........EGV..........
    distance :      <----------24--------------><----8----->

    La longueur de la clé divise alors le PGCD de 24 et 8.
    """
    al = "".join([ chr(97+i) for i in range(0,26)])     # L'alphabet
    al = al.upper()

    # Rescencement de tous les mot répétés
    dico = {}
    for i in range(0, len(chaine)-2):
        t = chaine[i:i+mot]
        if t in dico: dico[t].append(i)
        else: dico[t] = [i]

    # Récupération de la distance entre deux occurences du mot
    dis = []
    for d in dico:
        p = dico[d]
        if len(p) > 1:
            for i in range(0, len(p)-1): dis.append(p[i+1] - p[i])

    # Extraction du PGCD
    if len(dis) == 0:   raise Exception("Impossible de determiner la clé")

    if len(dis) == 1:   return dis[0]

    longueur = PGCD(dis[0], dis[1])
    for d in dis:   longueur = PGCD(longueur, d)

    if longueur > longueur_suffisante:    # Si la longueur est suffisante on estime que le résultat est correct
        return longueur
    else:              # Sinon on relance avec des mots à plus de caractères
        return estimationLongueurCle(chaine, mot+1)

def trouverCle(code, l) :
    """
    Détermine la clé en connaissant la longueur.
    On suppose que la lettre E est la plus fréquente.
    """
    al = "".join([chr(97+i) for i in range(0, 26)])
    al = al.upper()
    cle = ""

    for i in range(0, l):
        nombre = [0 for a in al]
        sous = code[i:len(code):l]  # On extrait toutes les lettres

        # On compte les lettre
        for k in sous: nombre[al.find(k)] += 1

        # On cherche le maximum
        p = 0
        for k in range(0, len (nombre)) :
            if nombre[k] > nombre[p]: p = k

        # On suppose que al[p] est la lettre E codée, il ne reste plus qu'a trouver la lettre de la cle qui a permis de coder E en al[p]
        cle += al[(p + 26 - al.find("E")) % 26]

    return cle

def decode(chaine):
    """
    Appelle les fonctions de recherche de la clé puis de décodage.
    """
    length = estimationLongueurCle(chaine)
    cle = trouverCle(chaine, length)
    print("Clé: " + cle)

    return decodeV(chaine, cle)

chaine = "KQOWEFVJPUJUUNUKGLMEKJINMWUXFQMKJBGWRLFNFGHUDWUUMBSVLPS\
NCMUEKQCTESWREEKOYSSIWCTUAXYOTAPXPLWPNTCGOJBGFQHTDWXIZAYG\
FFNSXCSEYNCTSSPNTUJNYTGGWZGRWUUNEJUUQEAPYMEKQHUIDUXFP\
GUYTSMTFFSHNUOCZGMRUWEYTRGKMEEDCTVRECFBDJQCUSWVBPNLGOYL\
SKMTEFVJJTWWMFMWPNMEMTMHRSPXFSSKFFSTNUOCZGMDOEOYEEKCPJR\
GPMURSKHFRSEIUEVGOYCWXIZAYGOSAANYDOEOYJLWUNHAMEBFELXYVL\
WNOJNSIOFRWUCCESWKVIDGMUCGOCRUWGNMAAFFVNSIUDEKQHCEUCPFC\
MPVSUDGAVEMNYMAMVLFMAOYFNTQCUAFVFJNXKLNEIWCWODCCULWRIFT\
WGMUSWOVMATNYBUHTCOCWFYTNMGYTQMKBBNLGFBTWOJFTWGNTEJKNEE\
DCLDHWTVBUVGFBIJG"

print("Chaîne codée: " + chaine)
print("Chaîne décodée: " + decode(chaine))
