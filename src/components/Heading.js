export default function Headin({children,style,...props}){
    return(
        <Text {...props} style={{style}} >

            {children}
        </Text>
    )
}
const styles=StyleSheet.create({
    text:{
        fontSize:32,
         color:'black'
    }
})