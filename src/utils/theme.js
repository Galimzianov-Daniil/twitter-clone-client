export default {
    palette: {
        primary: {
            main: "#8bc34a",
            contrastText: "#fff"
        },
        secondary: {
            main: "#f44336",
            contrastText: "#fff"
        },
    },
    styles: {
        form: {
            textAlign: "center"
        },
        pageTitle: {
            marginBottom: 20
        },
        textField: {
            marginBottom: 20
        },
        button: {
            marginBottom: 10,
        },
        customError: {
            marginBottom: 10,
            color: "red"
        },
        visibleSeparator: {
            width: "100%",
            borderTop: "1px solid grey"
        },
        invisibleSeparator: {
            border: "none"
        },
        profile: {
            '& .image-wrapper': {
                textAlign: 'center',
                position: 'relative',
                '& button': {
                    position: 'absolute',
                    top: '80%',
                    left: '70%'
                }
            },
            '& .profile-image': {
                width: 200,
                height: 200,
                objectFit: 'cover',
                maxWidth: '100%',
                borderRadius: '50%'
            },
            '& .profile-details': {
                textAlign: 'center',
                '& span, svg': {
                    verticalAlign: 'middle'
                },
                '& a': {
                    color: '#00bcd4'
                }
            },
            '& hr': {
                border: 'none',
                margin: '0 0 10px 0'
            },
            '& svg.button': {
                '&:hover': {
                    cursor: 'pointer'
                }
            },
        },
        paper: {
            padding: 20
        },
        buttons: {
            textAlign: 'center',
            '& a': {
                margin: '20px 10px'
            }
        },
        card: {
            display: "flex",
            marginBottom: 20
        },
        cardContent: {
            width: "100%",
            flexDirection: "column",
            padding: 25
        },
        cover: {
            minWidth: 200,
            objectFit: "cover"
        },
        handle: {
            width: 60,
            height: 20,
            backgroundColor: "#8bc34a",
            marginBottom: 7
        },
        date: {
            height: 14,
            width: 100,
            backgroundColor: "rgba(0,0,0, 0.3)",
            marginBottom: 10
        },
        fullLine: {
            height: 15,
            width: "90%",
            marginBottom: 10,
            backgroundColor: "rgba(0,0,0, 0.1)",
        },
        halfLine: {
            height: 15,
            width: "50%",
            backgroundColor: "rgba(0,0,0, 0.1)",
        }
    }
}