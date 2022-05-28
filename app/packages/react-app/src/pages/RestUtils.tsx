import axios from "axios";
import {
  UserLoginInfo,
  MetadataInfo,
  ShaderQueryInfo,
  MetadataAddInfo,
} from "./Interfaces";

export function GetAllMetadatas(callback: (res: MetadataInfo[]) => void): void {
  /* eslint-disable   @typescript-eslint/no-non-null-assertion */
  const userObj: UserLoginInfo = JSON.parse(localStorage.getItem("user")!);

  axios
    .get("http://localhost:3000/api/meta", {
      headers: {
        "Content-Type": `application/json`,
        Authorization: `${userObj.token}`,
      },
    })
    .then((res) => {
      console.log(
        "GET http://localhost:3000/api/meta Request Success : " +
          JSON.stringify(res.data)
      );
      callback(res.data.data);
    })
    .catch((ex) => {
      console.log("GET http://localhost:3000/api/meta Request Fail : " + ex);
    })
    .finally(() => {
      console.log("GET http://localhost:3000/api/meta Request End");
    });
}

export function GetAllMetadatasWithOwner(
  callback: (res: MetadataInfo[]) => void
): void {
  /* eslint-disable   @typescript-eslint/no-non-null-assertion */
  const userObj: UserLoginInfo = JSON.parse(localStorage.getItem("user")!);

  axios
    .get(`http://localhost:3000/api/meta/getbyowner/${userObj.user.username}`, {
      headers: {
        "Content-Type": `application/json`,
        Authorization: `${userObj.token}`,
      },
    })
    .then((res) => {
      console.log(
        `GET http://localhost:3000/api/meta/getbyowner/${userObj.user.username} Request Success : ` +
          JSON.stringify(res.data)
      );
      callback(res.data.data);
    })
    .catch((ex) => {
      console.log(
        `GET http://localhost:3000/api/meta/getbyowner/${userObj.user.username} Request Fail : ` +
          ex
      );
    })
    .finally(() => {
      console.log(
        `GET http://localhost:3000/api/meta/getbyowner/${userObj.user.username} Request End`
      );
    });
}

export function GetShaderCode(
  metaId: string,
  callback: (res: ShaderQueryInfo) => void
): void {
  /* eslint-disable   @typescript-eslint/no-non-null-assertion */
  const userObj: UserLoginInfo = JSON.parse(localStorage.getItem("user")!);

  axios
    .get(`http://localhost:3000/api/meta/getshader/${metaId}`, {
      headers: {
        "Content-Type": `application/json`,
        Authorization: `${userObj.token}`,
      },
    })
    .then((res) => {
      console.log(
        `GET http://localhost:3000/api/meta/getshader/${metaId} Request Success : ` +
          JSON.stringify(res.data)
      );
      callback(res.data);
    })
    .catch((ex) => {
      console.log(
        `GET http://localhost:3000/api/meta/getshader/${metaId} Request Fail : ` +
          ex
      );
    })
    .finally(() => {
      console.log(
        `GET http://localhost:3000/api/meta/getshader/${metaId} Request End`
      );
    });
}

export function StoreNFTMetadataInfo(
  info: MetadataAddInfo,
  callback: (metaId: string) => void
): void {
  /* eslint-disable   @typescript-eslint/no-non-null-assertion */
  const userObj: UserLoginInfo = JSON.parse(localStorage.getItem("user")!);

  const form = new FormData();
  form.append("owner", info.owner);
  form.append("price", info.price.toString());
  form.append("minter", info.minter);
  form.append("title", info.title);
  form.append("description", info.description);
  form.append("shader", info.shader);

  axios
    .post("http://localhost:3000/api/meta/add", form, {
      headers: {
        "Content-Type": `application/json`,
        Authorization: `${userObj.token}`,
      },
    })
    .then((res) => {
      console.log("POST api/meta/add requset success : " + JSON.stringify(res));
      callback(res.data.data.InsertedID);
    })
    .catch((ex) => {
      console.log("POST api/meta/add requset fail : " + ex);
    })
    .finally(() => {
      console.log("POST api/meta/add Request End");
    });
}

export function TransferNFTOwnership(metaId: string): void {
  /* eslint-disable   @typescript-eslint/no-non-null-assertion */
  const userObj: UserLoginInfo = JSON.parse(localStorage.getItem("user")!);

  const form = new FormData();
  form.append("owner", userObj.user.username);
  axios
    .put(`http://localhost:3000/api/meta/update/${metaId}`, form, {
      headers: {
        "Content-Type": `application/json`,
        Authorization: `${userObj.token}`,
      },
    })
    .then((res) => {
      console.log(
        `PUT http://localhost:3000/api/meta/update/${metaId} Request Success : ` +
          JSON.stringify(res.data)
      );
    })
    .catch((ex) => {
      console.log(
        `PUT http://localhost:3000/api/meta/update/${metaId} Request Fail : ` +
          ex
      );
    })
    .finally(() => {
      console.log(
        `PUT http://localhost:3000/api/meta/update/${metaId} Request End`
      );
    });
}

export function StoreMintShaderTokenID(
  mstAddress: string,
  metaId: string
): void {
  /* eslint-disable   @typescript-eslint/no-non-null-assertion */
  const userObj: UserLoginInfo = JSON.parse(localStorage.getItem("user")!);

  const form = new FormData();
  form.append("MST", mstAddress);
  form.append("Id", metaId);
  axios
    .post(`http://localhost:3000/api/meta/mst_id`, form, {
      headers: {
        "Content-Type": `application/json`,
        Authorization: `${userObj.token}`,
      },
    })
    .then((res) => {
      console.log(
        `POST http://localhost:3000/api/meta/mst_id Request Success : ` +
          JSON.stringify(res.data)
      );
    })
    .catch((ex) => {
      console.log(
        `POST http://localhost:3000/api/meta/mst_id Request Fail : ` + ex
      );
    })
    .finally(() => {
      console.log(`POST http://localhost:3000/api/meta/mst_id Request End`);
    });
}

export function GetMintShaderTokenAddress(
  metaId: string,
  callback: (mstAddress: string) => void
): void {
  /* eslint-disable   @typescript-eslint/no-non-null-assertion */
  const userObj: UserLoginInfo = JSON.parse(localStorage.getItem("user")!);

  axios
    .get(`http://localhost:3000/api/meta/mst_id/${metaId}`, {
      headers: {
        "Content-Type": `application/json`,
        Authorization: `${userObj.token}`,
      },
    })
    .then((res) => {
      console.log(
        `GET http://localhost:3000/api/meta/mst_id/${metaId} Request Success : ` +
          JSON.stringify(res.data)
      );
      callback(res.data.data[0].mst);
    })
    .catch((ex) => {
      console.log(
        `GET http://localhost:3000/api/meta/mst_id/${metaId} Request Fail : ` +
          ex
      );
    })
    .finally(() => {
      console.log(
        `GET http://localhost:3000/api/meta/mst_id/${metaId} Request End`
      );
    });
}

export function StoreTradeShaderTokenAddress(
  mstAddress: string,
  tstAddress: string
): void {
  /* eslint-disable   @typescript-eslint/no-non-null-assertion */
  const userObj: UserLoginInfo = JSON.parse(localStorage.getItem("user")!);

  const form = new FormData();
  form.append("MST", mstAddress);
  form.append("TST", tstAddress);
  axios
    .post(`http://localhost:3000/api/meta/mst_tst`, form, {
      headers: {
        "Content-Type": `application/json`,
        Authorization: `${userObj.token}`,
      },
    })
    .then((res) => {
      console.log(
        `POST http://localhost:3000/api/meta/mst_tst Request Success : ` +
          JSON.stringify(res.data)
      );
    })
    .catch((ex) => {
      console.log(
        `POST http://localhost:3000/api/meta/mst_tst Request Fail : ` + ex
      );
    })
    .finally(() => {
      console.log(`POST http://localhost:3000/api/meta/mst_tst Request End`);
    });
}

export function GetTradeShaderTokenAddress(
  mstAddress: string,
  callback: (tstAddress: string) => void
): void {
  /* eslint-disable   @typescript-eslint/no-non-null-assertion */
  const userObj: UserLoginInfo = JSON.parse(localStorage.getItem("user")!);

  axios
    .get(`http://localhost:3000/api/meta/mst_tst/${mstAddress}`, {
      headers: {
        "Content-Type": `application/json`,
        Authorization: `${userObj.token}`,
      },
    })
    .then((res) => {
      console.log(
        `GET http://localhost:3000/api/meta/mst_tst/${mstAddress} Request Success : ` +
          JSON.stringify(res.data)
      );
      callback(res.data.data[0].tst);
    })
    .catch((ex) => {
      console.log(
        `GET http://localhost:3000/api/meta/mst_tst/${mstAddress} Request Fail : ` +
          ex
      );
    })
    .finally(() => {
      console.log(
        `GET http://localhost:3000/api/meta/mst_tst/${mstAddress} Request End`
      );
    });
}

export function SignupRequest(
  signupForm: FormData,
  callback: (res: string) => void
): void {
  const signupData = {
    email: signupForm.get("email"),
    password: signupForm.get("password"),
    username: signupForm.get("username"),
  };
  console.log(signupData);
  axios
    .post("http://localhost:3000/api/signup", JSON.stringify(signupData), {
      headers: {
        "Content-Type": `application/json`,
      },
    })
    .then((res) => {
      console.log("POST api/signup requset success : " + JSON.stringify(res));
      callback(JSON.stringify(res.data));
    })
    .catch((ex) => {
      console.log("POST api/signup requset fail : " + ex);
    })
    .finally(() => {
      console.log("POST api/signup Request End");
    });
}

export function LoginRequest(
  email: string,
  password: string,
  callback: (res: string) => void
): void {
  const data = { email: email, password: password };
  axios
    .post("http://localhost:3000/api/loginin", JSON.stringify(data), {
      headers: {
        "Content-Type": `application/json`,
      },
    })
    .then((res) => {
      console.log("POST api/loginin requset success : " + res);
      callback(JSON.stringify(res.data));
    })
    .catch((ex) => {
      console.log("POST api/loginin requset fail : " + ex);
    })
    .finally(() => {
      console.log("POST api/loginin Request End");
    });
}
