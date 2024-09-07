from typing import List, Optional
from config import Base, engine, get_db_session


from sqlalchemy import (
    ARRAY,
    BigInteger,
    Boolean,
    CheckConstraint,
    Column,
    Computed,
    DateTime,
    Double,
    ForeignKeyConstraint,
    Identity,
    Index,
    Integer,
    Numeric,
    PrimaryKeyConstraint,
    SmallInteger,
    String,
    Table,
    Text,
    UniqueConstraint,
    Uuid,
    text,
)
from sqlalchemy.dialects.postgresql import JSONB, OID
from sqlalchemy.orm import Mapped, declarative_base, mapped_column, relationship
from sqlalchemy.orm.base import Mapped


metadata = Base.metadata


class Users(Base):
    __tablename__ = "users"
    __table_args__ = (
        CheckConstraint(
            "email_change_confirm_status >= 0 AND email_change_confirm_status <= 2",
            name="users_email_change_confirm_status_check",
        ),
        PrimaryKeyConstraint("id", name="users_pkey"),
        UniqueConstraint("phone", name="users_phone_key"),
        Index("confirmation_token_idx", "confirmation_token", unique=True),
        Index(
            "email_change_token_current_idx", "email_change_token_current", unique=True
        ),
        Index("email_change_token_new_idx", "email_change_token_new", unique=True),
        Index("reauthentication_token_idx", "reauthentication_token", unique=True),
        Index("recovery_token_idx", "recovery_token", unique=True),
        Index("users_email_partial_key", "email", unique=True),
        Index("users_instance_id_email_idx", "instance_id"),
        Index("users_instance_id_idx", "instance_id"),
        Index("users_is_anonymous_idx", "is_anonymous"),
        {
            "comment": "Auth: Stores user login data within a secure schema.",
            "schema": "auth",
        },
    )

    id = mapped_column(Uuid)
    is_sso_user = mapped_column(
        Boolean,
        nullable=False,
        server_default=text("false"),
        comment="Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.",
    )
    is_anonymous = mapped_column(Boolean, nullable=False, server_default=text("false"))
    instance_id = mapped_column(Uuid)
    aud = mapped_column(String(255))
    role = mapped_column(String(255))
    email = mapped_column(String(255))
    encrypted_password = mapped_column(String(255))
    email_confirmed_at = mapped_column(DateTime(True))
    invited_at = mapped_column(DateTime(True))
    confirmation_token = mapped_column(String(255))
    confirmation_sent_at = mapped_column(DateTime(True))
    recovery_token = mapped_column(String(255))
    recovery_sent_at = mapped_column(DateTime(True))
    email_change_token_new = mapped_column(String(255))
    email_change = mapped_column(String(255))
    email_change_sent_at = mapped_column(DateTime(True))
    last_sign_in_at = mapped_column(DateTime(True))
    raw_app_meta_data = mapped_column(JSONB)
    raw_user_meta_data = mapped_column(JSONB)
    is_super_admin = mapped_column(Boolean)
    created_at = mapped_column(DateTime(True))
    updated_at = mapped_column(DateTime(True))
    phone = mapped_column(Text, server_default=text("NULL::character varying"))
    phone_confirmed_at = mapped_column(DateTime(True))
    phone_change = mapped_column(Text, server_default=text("''::character varying"))
    phone_change_token = mapped_column(
        String(255), server_default=text("''::character varying")
    )
    phone_change_sent_at = mapped_column(DateTime(True))
    confirmed_at = mapped_column(
        DateTime(True),
        Computed("LEAST(email_confirmed_at, phone_confirmed_at)", persisted=True),
    )
    email_change_token_current = mapped_column(
        String(255), server_default=text("''::character varying")
    )
    email_change_confirm_status = mapped_column(SmallInteger, server_default=text("0"))
    banned_until = mapped_column(DateTime(True))
    reauthentication_token = mapped_column(
        String(255), server_default=text("''::character varying")
    )
    reauthentication_sent_at = mapped_column(DateTime(True))
    deleted_at = mapped_column(DateTime(True))

    user: Mapped["User"] = relationship("User", uselist=False, back_populates="user")


t_pg_stat_statements = Table(
    "pg_stat_statements",
    metadata,
    Column("userid", OID),
    Column("dbid", OID),
    Column("toplevel", Boolean),
    Column("queryid", BigInteger),
    Column("query", Text),
    Column("plans", BigInteger),
    Column("total_plan_time", Double(53)),
    Column("min_plan_time", Double(53)),
    Column("max_plan_time", Double(53)),
    Column("mean_plan_time", Double(53)),
    Column("stddev_plan_time", Double(53)),
    Column("calls", BigInteger),
    Column("total_exec_time", Double(53)),
    Column("min_exec_time", Double(53)),
    Column("max_exec_time", Double(53)),
    Column("mean_exec_time", Double(53)),
    Column("stddev_exec_time", Double(53)),
    Column("rows", BigInteger),
    Column("shared_blks_hit", BigInteger),
    Column("shared_blks_read", BigInteger),
    Column("shared_blks_dirtied", BigInteger),
    Column("shared_blks_written", BigInteger),
    Column("local_blks_hit", BigInteger),
    Column("local_blks_read", BigInteger),
    Column("local_blks_dirtied", BigInteger),
    Column("local_blks_written", BigInteger),
    Column("temp_blks_read", BigInteger),
    Column("temp_blks_written", BigInteger),
    Column("blk_read_time", Double(53)),
    Column("blk_write_time", Double(53)),
    Column("temp_blk_read_time", Double(53)),
    Column("temp_blk_write_time", Double(53)),
    Column("wal_records", BigInteger),
    Column("wal_fpi", BigInteger),
    Column("wal_bytes", Numeric),
    Column("jit_functions", BigInteger),
    Column("jit_generation_time", Double(53)),
    Column("jit_inlining_count", BigInteger),
    Column("jit_inlining_time", Double(53)),
    Column("jit_optimization_count", BigInteger),
    Column("jit_optimization_time", Double(53)),
    Column("jit_emission_count", BigInteger),
    Column("jit_emission_time", Double(53)),
)


t_pg_stat_statements_info = Table(
    "pg_stat_statements_info",
    metadata,
    Column("dealloc", BigInteger),
    Column("stats_reset", DateTime(True)),
)


class Sensor(Base):
    __tablename__ = "sensor"
    __table_args__ = (
        PrimaryKeyConstraint("id", name="sensor_pkey"),
        UniqueConstraint("sensor_name", name="sensor_sensor_name_key"),
    )

    id = mapped_column(String(50))
    location = mapped_column(String(100), nullable=False)
    installation_date = mapped_column(
        DateTime(True), nullable=False, server_default=text("now()")
    )
    sensor_name = mapped_column(Text, nullable=False)

    emergency_fire_logs: Mapped[List["EmergencyFireLogs"]] = relationship(
        "EmergencyFireLogs", uselist=True, back_populates="sensor"
    )
    Garbage: Mapped[List["Garbage"]] = relationship(
        "Garbage", uselist=True, back_populates="sensor"
    )
    emergency_report: Mapped[List["EmergencyReport"]] = relationship(
        "EmergencyReport", uselist=True, back_populates="sensor"
    )
    energy_usage: Mapped[List["EnergyUsage"]] = relationship(
        "EnergyUsage", uselist=True, back_populates="sensor"
    )
    water_usage: Mapped[List["WaterUsage"]] = relationship(
        "WaterUsage", uselist=True, back_populates="sensor"
    )


class EmergencyFireLogs(Base):
    __tablename__ = "emergency_fire_logs"
    __table_args__ = (
        ForeignKeyConstraint(["sensor_id"], ["sensor.id"], name="fk_sensor"),
        PrimaryKeyConstraint("id", name="emergency_fire_logs_pkey"),
    )

    id = mapped_column(Integer)
    sensor_id = mapped_column(String(50), nullable=False)
    fire_hazard_level = mapped_column(Integer, nullable=False)
    smoke_level = mapped_column(Integer, nullable=False)
    temp_level = mapped_column(Integer, nullable=False)
    log_time = mapped_column(DateTime, server_default=text("CURRENT_TIMESTAMP"))

    sensor: Mapped["Sensor"] = relationship(
        "Sensor", back_populates="emergency_fire_logs"
    )


class User(Base):
    __tablename__ = "user"
    __table_args__ = (
        ForeignKeyConstraint(["user_id"], ["auth.users.id"], name="user_user_id_fkey"),
        PrimaryKeyConstraint("id", name="user_pkey"),
        UniqueConstraint("user_id", name="user_user_id_key"),
    )

    id = mapped_column(Integer)
    email = mapped_column(Text, nullable=False)
    name = mapped_column(Text)
    tags = mapped_column(ARRAY(Text()))
    user_id = mapped_column(Uuid)
    phone_number = mapped_column(Text)

    user: Mapped[Optional["Users"]] = relationship("Users", back_populates="user")
    Garbage: Mapped[List["Garbage"]] = relationship(
        "Garbage", uselist=True, back_populates="user"
    )
    emergency_report: Mapped[List["EmergencyReport"]] = relationship(
        "EmergencyReport", uselist=True, back_populates="user"
    )
    energy_usage: Mapped[List["EnergyUsage"]] = relationship(
        "EnergyUsage", uselist=True, back_populates="user"
    )
    events: Mapped[List["Events"]] = relationship(
        "Events", uselist=True, back_populates="user"
    )
    water_usage: Mapped[List["WaterUsage"]] = relationship(
        "WaterUsage", uselist=True, back_populates="user"
    )
    volunteer_forms: Mapped[List["VolunteerForms"]] = relationship(
        "VolunteerForms", uselist=True, back_populates="user"
    )


class Garbage(Base):
    __tablename__ = "Garbage"
    __table_args__ = (
        ForeignKeyConstraint(
            ["sensor_id"], ["sensor.sensor_name"], name="Garbage_sensor_id_fkey"
        ),
        ForeignKeyConstraint(
            ["user_id"], ["user.user_id"], name="Garbage_user_id_fkey"
        ),
        PrimaryKeyConstraint("id", name="Garbage_pkey"),
    )

    id = mapped_column(
        BigInteger,
        Identity(
            start=1,
            increment=1,
            minvalue=1,
            maxvalue=9223372036854775807,
            cycle=False,
            cache=1,
        ),
    )
    location = mapped_column(Text)
    sensor_id = mapped_column(Text)
    timestamp = mapped_column(DateTime)
    user_id = mapped_column(Uuid)

    sensor: Mapped[Optional["Sensor"]] = relationship(
        "Sensor", back_populates="Garbage"
    )
    user: Mapped[Optional["User"]] = relationship("User", back_populates="Garbage")


class EmergencyReport(Base):
    __tablename__ = "emergency_report"
    __table_args__ = (
        ForeignKeyConstraint(
            ["sensor_id"],
            ["sensor.sensor_name"],
            ondelete="SET NULL",
            name="emergency_report_sensor_id_fkey",
        ),
        ForeignKeyConstraint(
            ["user_id"], ["user.user_id"], name="emergency_report_user_id_fkey"
        ),
        PrimaryKeyConstraint("id", name="emergency_report_pkey"),
    )

    id = mapped_column(Integer)
    emergency_type = mapped_column(String(50), nullable=False)
    location = mapped_column(String(100), nullable=False)
    timestamp = mapped_column(
        DateTime(True), nullable=False, server_default=text("now()")
    )
    sensor_id = mapped_column(Text)
    user_id = mapped_column(Uuid)

    sensor: Mapped[Optional["Sensor"]] = relationship(
        "Sensor", back_populates="emergency_report"
    )
    user: Mapped[Optional["User"]] = relationship(
        "User", back_populates="emergency_report"
    )


class EnergyUsage(Base):
    __tablename__ = "energy_usage"
    __table_args__ = (
        ForeignKeyConstraint(
            ["sensor_id"],
            ["sensor.sensor_name"],
            ondelete="CASCADE",
            name="energy_usage_sensor_id_fkey",
        ),
        ForeignKeyConstraint(
            ["user_id"], ["user.user_id"], name="energy_usage_user_id_fkey"
        ),
        PrimaryKeyConstraint("id", name="energy_usage_pkey"),
    )

    id = mapped_column(Integer)
    location = mapped_column(String(100), nullable=False)
    sensor_id = mapped_column(Text, nullable=False)
    usage_kwh = mapped_column(Double(53), nullable=False)
    timestamp = mapped_column(
        DateTime(True), nullable=False, server_default=text("now()")
    )
    user_id = mapped_column(Uuid)

    sensor: Mapped["Sensor"] = relationship("Sensor", back_populates="energy_usage")
    user: Mapped[Optional["User"]] = relationship("User", back_populates="energy_usage")


class Events(Base):
    __tablename__ = "events"
    __table_args__ = (
        ForeignKeyConstraint(["user_id"], ["user.user_id"], name="events_user_id_fkey"),
        PrimaryKeyConstraint("id", name="events_pkey"),
    )

    id = mapped_column(Integer)
    title = mapped_column(Text, nullable=False)
    description = mapped_column(Text, nullable=False)
    datetime = mapped_column(DateTime(True), nullable=False)
    location = mapped_column(Text, nullable=False)
    tags = mapped_column(ARRAY(Text()), nullable=False)
    approval_status = mapped_column(
        Text, nullable=False, server_default=text("'pending'::text")
    )
    poster_filename = mapped_column(Text)
    user_id = mapped_column(Uuid)

    user: Mapped[Optional["User"]] = relationship("User", back_populates="events")
    volunteer_forms: Mapped[List["VolunteerForms"]] = relationship(
        "VolunteerForms", uselist=True, back_populates="event"
    )


class WaterUsage(Base):
    __tablename__ = "water_usage"
    __table_args__ = (
        ForeignKeyConstraint(
            ["sensor_id"],
            ["sensor.sensor_name"],
            ondelete="CASCADE",
            name="water_usage_sensor_id_fkey",
        ),
        ForeignKeyConstraint(
            ["user_id"], ["user.user_id"], name="water_usage_user_id_fkey"
        ),
        PrimaryKeyConstraint("id", name="water_usage_pkey"),
    )

    id = mapped_column(Integer)
    location = mapped_column(String(100), nullable=False)
    sensor_id = mapped_column(Text, nullable=False)
    usage_liters = mapped_column(Double(53), nullable=False)
    timestamp = mapped_column(
        DateTime(True), nullable=False, server_default=text("now()")
    )
    user_id = mapped_column(Uuid)

    sensor: Mapped["Sensor"] = relationship("Sensor", back_populates="water_usage")
    user: Mapped[Optional["User"]] = relationship("User", back_populates="water_usage")


class VolunteerForms(Base):
    __tablename__ = "volunteer_forms"
    __table_args__ = (
        ForeignKeyConstraint(
            ["event_id"],
            ["events.id"],
            ondelete="CASCADE",
            name="volunteer_forms_event_id_fkey",
        ),
        ForeignKeyConstraint(
            ["user_id"], ["user.user_id"], name="volunteer_forms_user_id_fkey"
        ),
        PrimaryKeyConstraint("id", name="volunteer_forms_pkey"),
    )

    id = mapped_column(Integer)
    event_id = mapped_column(Integer, nullable=False)
    email = mapped_column(Text, nullable=False)
    phone_number = mapped_column(String(15), nullable=False)
    status = mapped_column(Text, nullable=False, server_default=text("'pending'::text"))
    address = mapped_column(Text)
    availability = mapped_column(Text)
    skills = mapped_column(ARRAY(Text()))
    user_id = mapped_column(Uuid)

    event: Mapped["Events"] = relationship("Events", back_populates="volunteer_forms")
    user: Mapped[Optional["User"]] = relationship(
        "User", back_populates="volunteer_forms"
    )
